<template>
  <div>
    <search-events />
    <router-link to="/createEvent">Create Event</router-link>
    <all-events v-if="eventsAtLocation === undefined" />
    <events-at-location v-else />
    <!-- <future-user-events />
    <past-user-events /> -->
  </div>
</template>

<script>
import AllEvents from "../components/AllEvents.vue";
import EventsAtLocation from "../components/EventsAtLocation.vue";
// import PastUserEvents from "../components/PastUserEvents.vue";
import SearchEvents from "../components/SearchEvents.vue";
export default {
  name: "home",
  computed: {
    eventsAtLocation() {
      return this.$store.state.eventsAtLocation;
    },
  },
  components: {
    AllEvents,
    SearchEvents,
    EventsAtLocation,
    // PastUserEvents,
  },
};
</script>

<style scoped></style>
