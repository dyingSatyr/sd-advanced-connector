const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8081;

const fs = require("fs");

const amqp = require("amqplib");
const parser = require("xml2js");
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

app.post("/env", function(req, res) {
  rmqip = req.body.rmqip;
  client = "APT" + req.body.fno + "." + req.body.acc;
  console.log(
    `Environment information updated: \nRMQ IP: ${req.body.rmqip}\nClient: APT${req.body.fno}.${req.body.acc}`
  );
  listenRMQQueue(rmqip, "notification", client, getCurrentConnOpts(client));
  listenRMQQueue(rmqip, "announcement", client, getCurrentConnOpts(client));
  res.send("Environment info was updated.");
});

// **********************
// Command POST Route
// **********************

app.post("/", function(req, res) {
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
    if (err) {
      console.log(err);
    }

    parser.parseString(data, (err, reqObject) => {
      if (err) {
        console.log(err);
      }
      //Result is Object from XML
      //console.dir(reqObject);

      //Change object properties
      for (const [key, value] of Object.entries(requestParams)) {
        reqObject[request][key] = value;
      }

      //Build XML again
      var builder = new parser.Builder();
      msg = builder.buildObject(reqObject);
      //console.log(`New message = ${msg}`);
    });
  });

  //Handle AMQP Request
  amqp
    .connect("amqps://" + rmqip + ":5671", getCurrentConnOpts(client))
    .then(function(conn) {
      return conn
        .createChannel()
        .then(function(ch) {
          console.log("Connection to RMQ Established.");
          let q = client;
          let ok = ch.checkQueue(q);
          return ok.then(function(_qok) {
            ch.publish(
              "amq.topic",
              "client." + client + ".command." + protocol,
              Buffer.from(msg),
              getCurrentConnParams(client, protocol)
            );
            console.log("Message sent:\n '%s'", msg);
            return ch.close();
          });
        })
        .finally(() => {
          conn.close();
          console.log("Connection to RMQ closed.");
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
  console.log(`AMQP Backend Service is now running on port: ${port}.`)
);

// **********************
// Queue listener func
// **********************

function listenRMQQueue(rmqip, queue, client, opts) {
  amqp
    .connect("amqps://" + rmqip + ":5671", opts)
    .then(function(conn2) {
      process.once("SIGINT", function() {
        conn2.close();
      });
      return conn2.createChannel().then(function(ch) {
        var ok = ch.checkQueue(queue + "." + client);
        ok = ok.then(function(_qok) {
          return ch.consume(
            queue + "." + client,
            function(msg) {
              console.log(
                "###### Message Received ######\n %s",
                msg.content.toString()
              );
              console.log("###### Waiting for further messages... ######");

              //Save messages to log folder
              let now = new Date();
              if (
                !fs.existsSync(
                  baseURL + "logs/" + queue + "." + client + ".log"
                )
              ) {
                fs.writeFile(
                  "logs/" + queue + "." + client + ".log",
                  now + " \r\n" + msg.content.toString(),
                  err => {
                    if (err) {
                      console.log("Error:", err);
                    }
                  }
                );
              } else {
                fs.appendFile(
                  baseURL + "logs/" + queue + "." + client + ".log",
                  "\r\n ###Next### " + now + " \r\n" + msg.content.toString(),
                  err => {
                    if (err) {
                      console.log("error", err);
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

        return ok.then(function(_consumeOk) {
          console.log(
            "###### Listening " + queue + "." + client + " queue.  ######"
          );
        });
      });
    })
    .catch(console.warn);
}

// **********************
// Getter Connection Opts
// **********************
function getCurrentConnOpts(client) {
  const opts = {
    pfx: fs.readFileSync(baseURL + "certificates/" + client + ".pfx"), // using pfx
    passphrase: "", // passphrase for key
    ca: [fs.readFileSync(baseURL + "certificates/" + client + ".crt")], // array of trusted CA certs
    credentials: amqp.credentials.external() // set auth mode
  };
  return opts;
}

//Get Current AMQP Request params
function getCurrentConnParams(client, protocol) {
  const params = {
    replyTo: "service." + client + ".reply." + protocol,
    correlationId: "randomString"
  };
  return params;
}

// **********************
// Set Last Message Rec
// **********************

function setLastMessageRecieved(q, msg) {
  console.log(`Message: ${msg} from queue: ${q}`);
  if (q == "notification") {
    lastNotification = msg;
  } else if (q == "announcement") {
    lastAnnouncement = msg;
  }
}
