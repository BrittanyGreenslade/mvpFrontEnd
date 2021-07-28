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
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped></style>
