const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8081;
const chalk = require("chalk");

const fs = require("fs");

const amqp = require("amqplib");
const parser = require("xml2js");
const { bgYellow } = require("chalk");
const baseURL = "./server/";

let lastNotification = "";
let lastAnnouncement = "";

// **********************
// Middlewares
// **********************

app.use(cors());
app.use(bodyParser.json());

//Set ENV
let rmqip = "10.29.10.141";
let client = "APT0001362.ACC1";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// **********************
// Index get route
// **********************
app.get("/", (req, res) => res.send("AMQP Backend Service is Online"));

// **********************
// GET last notification
// **********************
app.get("/notification", (req, res) => res.send(lastNotification));

// **********************
// GET last announcement
// **********************
app.get("/announcement", (req, res) => res.send(lastAnnouncement));

// **********************
// Environment POST route
// **********************

app.post("/env", (req, res) => {
  rmqip = req.body.rmqip;
  client = "APT" + req.body.fno + "." + req.body.acc;
  console.log(
    chalk.bgGreen(`Environment information updated: \n`) +
      chalk.cyan("RMQ IP: ") +
      `${req.body.rmqip}\n` +
      chalk.cyan(`Client: `) +
      `APT${req.body.fno}.${req.body.acc}`
  );
  listenRMQQueue(rmqip, "notification", client, getCurrentConnOpts(client));
  listenRMQQueue(rmqip, "announcement", client, getCurrentConnOpts(client));
  res.send("Environment info was updated.");
});

// **********************
// Command POST Route
// **********************

app.post("/", (req, res) => {
  //Get data from form
  const requestParams = req.body.params;
  const protocol = req.body.protocolName;
  const request = req.body.commandName;

  //Determine the path to correct xml file
  const pathToRequest =
    baseURL + "requests/" + protocol + "/" + request + ".xml";
  var msg = "";

  //Get text from XML
  fs.readFile(pathToRequest, "utf-8", (err, data) => {
    err
      ? console.log(chalk.bgRed(err))
      : console.log(chalk.cyan(`${request} file read successfully.`));

    parser.parseString(data, (err, reqObject) => {
      if (err) {
        console.log(err);
      }
      //Result is Object from XML
      // console.log("Request Obj:");
      // console.dir(reqObject);

      //Change object properties
      for (const [key, value] of Object.entries(requestParams)) {
        //if value is object, means we have a complex type
        if (value instanceof Object && !(value instanceof Array)) {
          for (const [k, v] of Object.entries(value)) {
            console.log(`k is ${k}, v is ${v}`);
            //reqObject[request][key][0][k] = v; old incorrect
            console.log("before:" + reqObject[request][key][0][k][0]._);
            reqObject[request][key][0][k][0]._ = v;
            console.log("after:" + reqObject[request][key][0][k][0]._);
          }
        } else {
          //Just plop in the value in key, no complex type
          reqObject[request][key] = value;
        }
      }

      //Build XML again
      var builder = new parser.Builder();
      msg = builder.buildObject(reqObject);
      // console.log(`New message = ${msg}`);
    });
  });

  //Send AMQP Request to RMQ Server
  amqp
    .connect("amqps://" + rmqip + ":5671", getCurrentConnOpts(client))
    .then((conn) => {
      console.log(chalk.green("Connection to RMQ established."));
      return conn
        .createChannel()
        .then(async (ch) => {
          console.log(chalk.green("Channel created."));
          await ch.checkQueue(client);
          ch.publish(
            "amq.topic",
            "client." + client + ".command." + protocol,
            Buffer.from(msg),
            getCurrentConnParams(client, protocol)
          );
          console.log(
            chalk.cyan("# Sending request #\n") +
              chalk.yellow(`${Buffer.from(msg)}`) +
              chalk.green("\nChannel closed.")
          );
          return ch.close();
        })
        .finally(() => {
          conn.close();
          console.log(chalk.red("Connection to RMQ closed."));
        });
    })
    .catch(console.warn);

  //Respond to client
  res.send("Message Sent");
}); //END POST to /

// **********************
// Run Server
// **********************
app.listen(port, () =>
  console.log(
    chalk.bgGreen(`AMQP Backend Service is now running on port: ${port}.`)
  )
);

// **********************
// Queue listener func
// **********************

const listenRMQQueue = (rmqip, queue, client, opts) => {
  amqp
    .connect("amqps://" + rmqip + ":5671", opts)
    .then(async (conn2) => {
      process.once("SIGINT", () => {
        conn2.close();
        console.log(chalk.bgRed("CONNECTION CLOSED FORCIBLY."));
      });
      const ch = await conn2.createChannel();
      var ok = ch.checkQueue(queue + "." + client);
      ok.then((_qok) => {
        return ch.consume(
          queue + "." + client,
          (msg) => {
            console.log(
              chalk.cyan(`# Message Received - Queue: ${queue} #\n`) +
                chalk.yellow(msg.content.toString())
            );
            //Save messages to log folder
            let now = new Date();
            if (
              !fs.existsSync(baseURL + "logs/" + queue + "." + client + ".log")
            ) {
              fs.writeFile(
                baseURL + "logs/" + queue + "." + client + ".log",
                now + " \r\n" + msg.content.toString(),
                (err) => {
                  if (err) {
                    console.log("Error:", err);
                  }
                }
              );
            } else {
              fs.appendFile(
                baseURL + "logs/" + queue + "." + client + ".log",
                "\r\n ###Next### " + now + " \r\n" + msg.content.toString(),
                (err_1) => {
                  if (err_1) {
                    console.log("error", err_1);
                  }
                }
              );
            }

            //Set last notification/announcment
            setLastMessageRecieved(queue, msg.content.toString());
          },
          { noAck: true }
        );
      });
      console.log(
        chalk.green(
          "###### Listening " + queue + "." + client + " queue.  ######"
        )
      );
    })
    .catch(console.warn);
};

// **********************
// Getter Connection Opts
// **********************
const getCurrentConnOpts = (client) => {
  const opts = {
    pfx: fs.readFileSync(baseURL + "certificates/" + client + ".pfx"), // using pfx
    passphrase: "", // passphrase for key
    ca: [fs.readFileSync(baseURL + "certificates/" + client + ".crt")], // array of trusted CA certs
    credentials: amqp.credentials.external(), // set auth mode
  };
  return opts;
};

//Get Current AMQP Request params
const getCurrentConnParams = (client, protocol) => {
  const params = {
    replyTo: "service." + client + ".reply." + protocol,
    correlationId: "randomString",
  };
  return params;
};

// **********************
// Set Last Message Rec
// **********************

const setLastMessageRecieved = (q, msg) => {
  if (q == "notification") {
    lastNotification = msg;
  } else if (q == "announcement") {
    lastAnnouncement = msg;
  }
};
