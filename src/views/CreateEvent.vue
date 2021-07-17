<template>
  <div>
    <create-event-form />
  </div>
</template>

<script>
import CreateEventForm from "../components/CreateEventForm.vue";
export default {
  name: "create-event",
  components: {
    CreateEventForm,
  },
};
</script>

<style scoped></style>
