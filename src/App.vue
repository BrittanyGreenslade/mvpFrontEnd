<template>
  <div id="app">
    <div class="notifyMobile">
      <h1>Destop/Tablet Mode Under Construction!</h1>
      <img id="pylon" src="./assets/cone.png" alt="pylon" />
    </div>
    <section class="mobileView">
      <page-header
        v-if="
          loginToken &&
            routePath !== `/profile/${userId}` &&
            loginToken &&
            routePath !== `/login` &&
            loginToken &&
            routePath !== `/signup`
        "
      />
      <router-view />
      <page-footer id="footer" v-if="loginToken" />
    </section>
  </div>
</template>
<script>
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
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  watch: {
    currentUserInfo(newValue, oldValue) {
      newValue, oldValue;
    },
    //routes to home when link path is just /
    routePath(newValue, oldValue) {
      if (this.loginToken && newValue === "/") {
        this.$router.push({ path: `/home` });
      }
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
      if (!this.loginToken) {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap");
/* styling for all things in app */
* {
  padding: 0;
  margin: 0;
}
@media only screen and (max-width: 500px) {
  .notifyMobile {
    display: none;
  }
}
@media only screen and (min-width: 500px) {
  .notifyMobile {
    display: grid;
    margin-top: 30px;
  }
  .mobileView {
    display: none;
  }
  #pylon {
    width: 100px;
    place-self: center;
  }
}
#app {
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  align-items: start;
}
a,
.backBtn {
  color: #ffff00;
  text-decoration: none;
  font-weight: bold;
}
.locationName {
  font-size: 13px;
  font-style: italic;
}
body {
  color: #05b0c7;
  font-family: "Roboto Mono", monospace;
  background: #151a20;
}

/* all divs in app take up 100% */
#app > section > div {
  height: 100%;
  width: 100%;
  display: grid;
}
#app > section {
  width: 100%;
  height: 100%;
}
.componentCtr {
  place-items: center;
  display: grid;
  width: 100%;
  min-height: 60vh;
}
.btn {
  width: 100px;
  height: 28px;
  border-radius: 5px;
  background: #222a35;
  border: none;
  box-shadow: 2px 2px #0d1116;
  display: grid;
  place-items: center;
  place-self: end;
}
.btn a,
.btn p,
.btn span {
  color: #bc4959;
  font-weight: 400;
  padding-bottom: 2px;
  border-bottom: 1px solid #bc4959;
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
/* changes colour of calendar icon on calendar input */
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.notifyNoEvents {
  width: 80%;
  place-self: center;
  text-align: center;
}
.landingInput {
  background: none;
  border: none;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid grey;
  color: grey;
  justify-content: end;
}
.landingTitle {
  justify-self: start;
  align-self: center;
  font-size: 35px;
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
.eventName {
  color: #be9759;
}
#searchBar {
  align-self: end;
  width: 80%;
  place-self: center;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 20px;
  margin-top: 15px;
  height: 20px;
  border: 1px solid grey;
}
.titleContainer {
  display: grid;
  width: 70%;
  margin-bottom: 20px;
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
  min-height: 80%;
  overflow: scroll;
}
.eventContainer {
  display: grid;
  width: 90%;
  border-bottom: 1px solid #9e49cf;
  /* border-radius: 15px; */
  place-self: center;
}

.eventContainerParent .eventContainer:nth-child(1) {
  border-top: 1px solid #9e49cf;
}

.eventContainerChild {
  display: grid;
  grid-auto-flow: column;
  padding: 8px;
  width: 90%;
  place-self: center;
  margin-bottom: 10px;
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
.hostLink {
  font-weight: normal;
  font-size: 14px;
}
#pageCtr {
  display: grid;
  place-items: center;
  width: 90%;
}
</style>
