<template>
  <div id="componentCtr">
    <edit-event-form />
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
export default {
  name: "edit-event",
  components: {
    EditEventForm,
  },
};
</script>

<style scoped>
#componentCtr {
  height: 80%;
}
</style>
