<template>
  <div>
    <user-profile />
  </div>
</template>
<script>
import UserProfile from "../components/UserProfile.vue";
export default {
  name: "profile",
  components: {
    UserProfile,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped></style>
