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
  mounted() {},
};
</script>

<style scoped></style>
