<template>
  <div class="comp-container comp-announcement">
    <h1>Announcement Stream</h1>
    <label for="announcement">Last recieved message:</label>
    <textarea rows="20" name="announcement" :value="lastAnnouncement"></textarea>
  </div>
</template>

<script>
export default {
  name: "LastAnnouncement",
  props: ["lastAnnouncement"], //End Props
  data() {
    return {};
  }, //End Data
  methods: {}
};
</script>

<style>
</style>


