<template>
  <div>
    <user-profile />
    <!-- <hr />
    <future-user-events />
    <hr />
    <past-user-events /> -->
  </div>
</template>
<script>
// import FutureUserEvents from "../components/FutureUserEvents.vue";
// import PastUserEvents from "../components/PastUserEvents.vue";
import UserProfile from "../components/UserProfile.vue";
export default {
  name: "profile",
  components: {
    UserProfile,
    // FutureUserEvents,
    // PastUserEvents,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
};
</script>

<style scoped></style>
