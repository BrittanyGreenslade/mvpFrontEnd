<template>
  <div>
    <edit-profile-form />
  </div>
</template>

<script>
import EditProfileForm from "../components/EditProfileForm.vue";
export default {
  name: "edit-profile",
  components: {
    EditProfileForm,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped></style>
