<template>
  <div>
    <h1>Welcome Back</h1>
    <form action="javascript:void(0)" id="loginForm">
      <input type="text" id="email" placeholder="email" required />
      <input type="password" id="password" placeholder="password" required />
      <input
        @click="login"
        type="submit"
        id="registerBtn"
        placeholder="login"
      />
    </form>
    <h3>New here? <router-link to="/signup">Register</router-link></h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "login-form",
  methods: {
    navigateToHome() {
      this.$router.push({
        path: "/home",
      });
    },
    login() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/login`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          },
        })
        .then((res) => {
          cookies.set("currentUserInfo", res.data);
          this.$store.commit("updateCurrentUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateLoginToken", res.data.loginToken),
            this.navigateToHome();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
