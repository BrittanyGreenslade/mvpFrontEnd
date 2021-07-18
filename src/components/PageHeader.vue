<template>
  <div v-if="loginToken">
    <h1>COOL APP NAME</h1>
    <router-link to="/home">Home</router-link> |
    <router-link :to="`/profile/${currentUserInfo.userId}`"
      >Profile</router-link
    >
    <logout-btn />
  </div>
</template>

<script>
import LogoutBtn from "../components/LogoutBtn.vue";
export default {
  name: "page-header",
  components: {
    LogoutBtn,
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
};
</script>

<style scoped></style>
