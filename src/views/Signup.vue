<template>
  <div>
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue";
export default {
  name: "signup",
  components: {
    SignUpForm,
  },

  mounted() {
    if (this.loginToken) {
      this.$router.push({
        path: "/home",
      });
    }
  },
};
</script>

<style scoped></style>
