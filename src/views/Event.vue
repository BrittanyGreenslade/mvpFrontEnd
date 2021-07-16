<template>
  <div>
    <page-header />
    <one-event />
    <edit-event />
    <delete-event />
    <attend-event />
  </div>
</template>
<script>
import AttendEvent from "../components/AttendEvent.vue";
import DeleteEvent from "../components/DeleteEvent.vue";
import EditEvent from "../components/EditEvent.vue";
import PageHeader from "../components/PageHeader.vue";
import OneEvent from "../components/OneEvent.vue";
export default {
  name: "event",
  components: {
    OneEvent,
    EditEvent,
    DeleteEvent,
    AttendEvent,
    PageHeader,
  },
};
</script>

<style scoped></style>
