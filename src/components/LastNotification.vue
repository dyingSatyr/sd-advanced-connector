<template>
  <div class="comp-container comp-notification">
    <h1>Notification Stream</h1>
    <vue-code-highlight>
      {{ lastNotification }}
    </vue-code-highlight>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
export default {
  name: "LastNotification",
  props: ["lastNotification"], //End Props
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
