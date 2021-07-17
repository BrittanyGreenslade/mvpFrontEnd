<template>
  <div>
    <edit-profile />
    <user-profile />
    <hr />
    <future-user-events />
    <hr />
  </div>
</template>
<script>
import EditProfile from "../components/EditProfile.vue";
import FutureUserEvents from "../components/FutureUserEvents.vue";
import UserProfile from "../components/UserProfile.vue";
export default {
  name: "profile",
  components: {
    UserProfile,
    FutureUserEvents,
    EditProfile,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
};
</script>

<style scoped></style>
