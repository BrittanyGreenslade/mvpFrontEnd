<template>
  <div id="componentCtr">
    <event-profile />
  </div>
</template>
<script>
import EventProfile from "../components/EventProfile.vue";
export default {
  name: "event",
  components: {
    EventProfile,
  },
};
</script>

<style scoped>
#componentCtr {
  height: auto;
}
</style>
