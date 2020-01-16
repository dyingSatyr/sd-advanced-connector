<template>
  <div id="app">
    <Environment @send-environment-details="setEnvironment" />
    <Protocols
      v-bind:protocols="protocols"
      v-bind:commands="commands"
      @send-request-info="sendRequestInfo"
    />
    <LastNotification v-bind:lastNotification="lastNotification" />
    <LastAnnouncement v-bind:lastAnnouncement="lastAnnouncement" />
    <!-- <p id="sent" v-text="messageSent"></p> -->
  </div>
</template>

<script>
//Import Libraries
import axios from "axios";

//Import Vue Components
import Protocols from "./components/Protocols.vue";
import Environment from "./components/Environment.vue";
import LastNotification from "./components/LastNotification.vue";
import LastAnnouncement from "./components/LastAnnouncement.vue";

//Import AC Information
import AC from "./data/data";

export default {
  name: "app",
  components: {
    Protocols,
    Environment,
    LastNotification,
    LastAnnouncement
  },
  data() {
    return {
      protocols: AC.protocols,
      commands: AC.commands,
      selectedId: 0,
      messageSent: "message",
      lastNotification: "No notifications yet.",
      lastAnnouncement: "No announcements yet."
    };
  },
  methods: {
    sendRequestInfo(req) {
      var self = this;
      req.commandName = AC.commands[req.protocol - 1][req.command - 1].name;
      req.protocolName = AC.protocols[req.protocol - 1].name;

      //Send request obj
      axios
        .post("http://localhost:8081/", req)
        .then(function(response) {
          // eslint-disable-next-line
          // console.log(response);
          self.messageSent = response.data;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    //Set ENV and start listening for announcments/notifications
    setEnvironment(req) {
      let self = this;
      //Send request obj
      axios
        .post("http://localhost:8081/env", req)
        .then(function(response) {
          // eslint-disable-next-line
          console.log(response);
          setInterval(() => {
            self.requestLastNotification();
            self.requestLastAnnouncement();
          }, 3000);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    requestLastNotification() {
      let self = this;
      axios
        .get("http://localhost:8081/notification")
        .then(function(response) {
          // eslint-disable-next-line
          // console.log(response);
          self.lastNotification = response.data;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    requestLastAnnouncement() {
      let self = this;
      axios
        .get("http://localhost:8081/announcement")
        .then(function(response) {
          // eslint-disable-next-line
          // console.log(response);
          self.lastAnnouncement = response.data;
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    }
  },
  created() {}
};
</script>

<style></style>
