<template>
  <div class="genGrid">
    <button class="btn" @click="logout(loginToken)" id="logoutBtn">
      <p>
        logout
      </p>
    </button>
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
      this.$router.push({ path: "/login" });
    },
    logout() {
      axios
        .request({
          url: `api/login`,
          // url: `${process.env.VUE_APP_API_URL}/login`,
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

<style scoped>
.btn {
  place-self: center;
}
</style>
