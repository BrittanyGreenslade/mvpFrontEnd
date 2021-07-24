<template>
  <div>
    <h1>Maybe scrolly pics</h1>
    <search-events id="searchBar" />
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

<style scoped>
#searchBar {
  align-self: end;
  width: 80%;
  place-self: center;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 20px;
  height: 20px;
  border: 1px solid grey;
}
</style>
