<template>
  <div>
    <event-profile />
    <!-- <delete-event /> -->
  </div>
</template>
<script>
// import DeleteEvent from "../components/DeleteEvent.vue";
import EventProfile from "../components/EventProfile.vue";
export default {
  name: "event",
  components: {
    EventProfile,
    // DeleteEvent,
  },
  computed: {
    // routePath() {
    //   return this.$route.path;
    // },
  },
  mounted() {
    // console.log(this.routePath);
  },
};
</script>

<style scoped></style>
