<template>
  <div>
    <edit-profile />
    <user-profile />
    <hr />
    <future-user-events />
    <hr />
    <past-user-events />
  </div>
</template>
<script>
import EditProfile from "../components/EditProfile.vue";
import FutureUserEvents from "../components/FutureUserEvents.vue";
import PastUserEvents from "../components/PastUserEvents.vue";
import UserProfile from "../components/UserProfile.vue";
export default {
  name: "profile",
  components: {
    UserProfile,
    FutureUserEvents,
    EditProfile,
    PastUserEvents,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  // mounted() {
  //   if (this.usersEvents === undefined) {
  //     this.$store.dispatch("getUsersEvents");
  //   }
  // },
};
</script>

<style scoped></style>
