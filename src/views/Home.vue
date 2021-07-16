<template>
  <div>
    <feature-events />
    <search-events />
    <create-event-btn />
    <future-user-events />
    <past-user-events />
  </div>
</template>

<script>
import CreateEventBtn from "../components/CreateEventBtn.vue";
import FeatureEvents from "../components/FeatureEvents.vue";
import FutureUserEvents from "../components/FutureUserEvents.vue";
import PastUserEvents from "../components/PastUserEvents.vue";
import SearchEvents from "../components/SearchEvents.vue";
export default {
  name: "home",
  components: {
    FeatureEvents,
    SearchEvents,
    CreateEventBtn,
    FutureUserEvents,
    PastUserEvents,
  },
};
</script>

<style scoped></style>
