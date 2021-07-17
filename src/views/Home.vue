<template>
  <div>
    <search-events />
    <router-link to="/createEvent">Create Event</router-link>
    <all-events />
    <!-- <future-user-events />
    <past-user-events /> -->
  </div>
</template>

<script>
import AllEvents from "../components/AllEvents.vue";
// import FutureUserEvents from "../components/FutureUserEvents.vue";
// import PastUserEvents from "../components/PastUserEvents.vue";
import SearchEvents from "../components/SearchEvents.vue";
export default {
  name: "home",
  components: {
    AllEvents,
    SearchEvents,
    // FutureUserEvents,
    // PastUserEvents,
  },
};
</script>

<style scoped></style>
