<template>
  <div class="comp-container comp-notification">
    <h1>Notification Stream</h1>
    <label for="notification">Last recieved message:</label>
    <textarea rows="20" name="notification" :value="lastNotification"></textarea>
  </div>
</template>

<script>
export default {
  name: "LastNotification",
  props: ["lastNotification"], //End Props
  data() {
    return {};
  }, //End Data
  methods: {}
};
</script>

<style>
</style>


