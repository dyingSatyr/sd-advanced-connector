<template>
  <div class="comp-container comp-environment">
    <h1>Environment Settings</h1>
    <!-- RMQIP Input -->
    <div class="form-group">
      <label :for="rmqip">RabbitMQ IP Address:</label>
      <input
        v-model="rmqip"
        type="text"
        placeholder="RabbitMQ IP Address"
        name="rmqip"
      />
    </div>

    <!-- Facility Number Input -->
    <div class="form-group">
      <label :for="fno">Facility Number:</label>
      <input
        v-model="fno"
        type="text"
        placeholder="7 digit Facility Number"
        name="fno"
      />
    </div>

    <!-- AC Client Shortname Input -->
    <div class="form-group">
      <label :for="acc">Advanced Connector Client:</label>
      <input
        v-model="acc"
        type="text"
        placeholder="AC Client Shortname"
        name="acc"
      />
    </div>

    <div class="form-group">
      <button @click="sendEnvironmentDetails(rmqip, fno, acc)">
        Set Environment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Environment",
  props: [], //End Props
  data() {
    return {
      acc: "AC001",
      fno: "0001347",
      rmqip: "10.29.10.142"
    };
  }, //End Data
  methods: {
    sendEnvironmentDetails(rmqip, fno, acc) {
      let environment = {
        rmqip: rmqip,
        fno: fno,
        acc: acc
      };
      this.$emit("send-environment-details", environment);
    }
  }
};
</script>

<style></style>
