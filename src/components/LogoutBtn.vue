<template>
  <div>
    <button @click="logout" id="logoutBtn">logout</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "logout-btn",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: "Login" });
    },
    logout() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/login`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          res;
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", undefined);
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", undefined);
          this.loginStatus = "Logging you out!";
          this.navigateToLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
