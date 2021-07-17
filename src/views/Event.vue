<template>
  <div>
    <event-profile />
    <edit-event />
    <delete-event />
  </div>
</template>
<script>
import DeleteEvent from "../components/DeleteEvent.vue";
import EditEvent from "../components/EditEvent.vue";
import EventProfile from "../components/EventProfile.vue";
export default {
  name: "event",
  components: {
    EventProfile,
    EditEvent,
    DeleteEvent,
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
