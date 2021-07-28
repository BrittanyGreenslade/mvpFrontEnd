<template>
  <div>
    <login-form />
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  components: { LoginForm },
  name: "login",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  mounted() {
    if (this.loginToken) {
      this.$router.push({
        path: `/home`,
      });
    }
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped></style>
