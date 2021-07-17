<template>
  <div>
    <h1>Create Account</h1>
    <form action="javascript:void(0)" id="signupForm">
      <input type="text" id="name" placeholder="name" required />
      <input type="text" id="email" placeholder="email" required />
      <input type="password" id="password" placeholder="password" required />
      <input type="text" id="cityName" placeholder="city name" required />
      <!-- maybe user bio -->
      <input type="text" id="countryName" placeholder="country name" required />
      <input
        @click="userSignup"
        type="submit"
        id="registerBtn"
        placeholder="register"
      />
    </form>
    <h3>
      Already have an account? <router-link to="/login">Login</router-link>
    </h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "sign-up-form",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    navigateToHome() {
      this.$router.push({
        path: `/home`,
      });
    },
    userSignup() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            cityName: document.getElementById("cityName").value,
            countryName: document.getElementById("countryName").value,
          },
        })
        .then((res) => {
          cookies.set("currentUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateCurrentUserInfo", res.data);
          this.$store.commit("updateLoginToken", res.data.loginToken);
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
