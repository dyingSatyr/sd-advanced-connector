<template>
  <div class="comp-container comp-announcement">
    <h1>Announcement Stream</h1>
    <vue-code-highlight>
      {{ lastAnnouncement }}
    </vue-code-highlight>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
export default {
  name: "LastAnnouncement",
  props: ["lastAnnouncement"], //End Props
  data() {
    return {};
  }, //End Data
  methods: {},
  components: {
    VueCodeHighlight
  }
};
</script>

<style></style>
