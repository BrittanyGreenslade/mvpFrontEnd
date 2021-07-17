<template>
  <div id="app">
    <page-header />
    <router-view />
    <footer>Copyright 2021 Brittany Greenslade</footer>
  </div>
</template>
<script>
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
      oldValue;
    },
  },
  mounted() {
    this.$router.push({ path: `/login` });
    // if (this.loginToken && this.$route.path === "/") {
    //   this.$router.push({ path: `/home` });
    // }
    // this.notifyLogin();
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
/* #nav 
LoginForm{
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
