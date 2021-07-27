<template>
  <div class="componentCtr">
    <img
      src="../assets/websiteNameLogoHeader.jpg"
      alt="web developmeet in vs code styling"
    />
    <div class="titleContainer">
      <h1 class="landingTitle">
        Welcome
      </h1>
      <h1 class="landingTitle">
        Back
      </h1>
    </div>
    <form autocomplete="off" action="javascript:void(0)" class="userForm">
      <input
        class="landingInput"
        type="text"
        id="email"
        placeholder="email"
        required
      />
      <input
        class="landingInput"
        type="password"
        id="password"
        placeholder="password (min length 8)"
        required
      />
      <button @click="login" class="btn">
        <p>
          login
        </p>
      </button>
    </form>
    <h3 class="landingNav">
      New here? <router-link to="/signup">Register</router-link>
    </h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "login-form",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
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

<style scoped>
h2 {
  margin-bottom: 30px;
}
.componentCtr {
  height: 90%;
  grid-template-rows: 1.5fr 0.5fr 1.75fr 0.5fr;
}
.userForm {
  grid-template-rows: 1fr 1fr 0.5fr;
}
</style>
