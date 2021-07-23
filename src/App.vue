<template>
  <div id="app">
    <section>
      <page-header
        v-if="
          (loginToken && routePath !== `/profile/${userId}`) ||
            (loginToken && routePath !== `/login`) ||
            (loginToken && routePath !== `/signup`)
        "
      />
      <router-view />
      <page-footer v-if="loginToken" />
    </section>
  </div>
</template>
<script>
// import cookies from "vue-cookies";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
export default {
  components: { PageHeader, PageFooter },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    routePath() {
      return this.$route.path;
    },
    userId() {
      return this.$route.params.userId;
    },
  },
  watch: {
    //routes to home when link path is just /
    routePath(newValue, oldValue) {
      if (this.loginToken && newValue === "/") {
        this.$router.push({ path: `/home` });
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
    console.log(this.loginToken);
    if (this.loginToken && this.$route.path === "/") {
      this.$router.push({ path: `/home` });
    }
    this.notifyLogin();
  },
  methods: {
    notifyLogin() {
      if (!this.loginToken) {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>

<style>
/* styling for all things in app */
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
#app > section > div {
  height: 100%;
  width: 100%;
  display: grid;
}
#app > section {
  height: 100%;
  width: 100%;
}
.componentCtr {
  place-items: center;
  display: grid;
  width: 100%;
  min-height: 80vh;
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
.btnContainer {
  display: grid;
  grid-auto-flow: column;
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
.landingTitle {
  justify-self: start;
  align-self: center;
  font-size: 45px;
}
textarea {
  resize: vertical;
}
/* input of create event/search bar */
.otherInput {
  border-radius: 10px;
  padding: 10px;
  height: 20px;
  width: 93%;
  border: 1px solid grey;
}

.titleContainer {
  display: grid;
  width: 70%;
}
/* general styling */
.bold {
  font-weight: bold;
}
.genGrid {
  display: grid;
}
/* form styling */
.formStyling {
  display: grid;
  row-gap: 15px;
  place-self: center;
  width: 85%;
}

/* event styling */
.eventContainerParent {
  display: grid;
  row-gap: 15px;
  margin-top: 15px;
}
.eventContainer {
  width: 90%;
  border: 2px solid black;
  border-radius: 15px;
  box-shadow: 2px 4px lightgrey;
  place-self: center;
}

.eventContainerChild {
  display: grid;
  grid-auto-flow: column;
  padding: 5px;
}
.eventContainerChild > img {
  place-self: center;
  width: 80px;
}

.actionIcon {
  width: 20px;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
