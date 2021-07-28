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
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
#componentCtr {
  height: auto;
  display: grid;
}
</style>
