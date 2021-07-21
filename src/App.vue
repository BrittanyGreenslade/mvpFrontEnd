<template>
  <div id="app">
    <page-header v-if="this.loginToken != undefined" />
    <router-view />
    <div id="footer">
      <footer>Copyright 2021 Brittany Greenslade</footer>
    </div>
  </div>
</template>
<script>
// import cookies from "vue-cookies";
import PageHeader from "./components/PageHeader.vue";
export default {
  components: { PageHeader },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    routePath() {
      return this.$route.path;
    },
  },
  watch: {
    //routes to feed when link path is just /
    routePath(newValue, oldValue) {
      if (this.loginToken && newValue === "/") {
        this.$router.push({ path: `/feed` });
      }
      //want to make it so if user navigates to login page, they're logged out.
      //does that matter? will someone ever do that seems silly but ppl are weird
      // else if (newValue === "/login") {
      //   this.$store.dispatch("logout", this.loginToken);
      // }
      oldValue;
    },
  },
  mounted() {
    if (this.loginToken && this.$route.path === "/") {
      this.$router.push({ path: `/home` });
    }
    this.notifyLogin();
  },
  methods: {
    notifyLogin() {
      if (this.loginToken === null) {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}
/* all divs in app take up 100% */
#app > div {
  height: 100%;
  width: 100%;
}
.componentCtr {
  place-items: center;
  display: grid;
  width: 100%;
  min-height: 80vh;
}
#footer {
  height: 15vh;
  display: grid;
  place-items: center;
}
.btn {
  width: 35%;
  height: 25px;
  border-radius: 10px;
  background: grey;
  border: none;
  display: grid;
  place-items: center;
  place-self: end;
}

/* sign-up/login page */
.userForm {
  place-items: center;
  display: grid;
  grid-auto-flow: row;
  width: 70%;
  height: 80%;
}
.landingInput {
  border: none;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid grey;
  justify-content: end;
}
textarea {
  height: 20px;
  resize: vertical;
}
.titleContainer {
  display: grid;
  width: 70%;
}
.landingTitle {
  justify-self: start;
  align-self: center;
}
</style>
