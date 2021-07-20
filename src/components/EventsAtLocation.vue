<template>
  <div>
    <div v-for="event in eventsAtLocation" :key="event.eventId">
      <p>{{ event.eventId }}</p>
      <p>{{ event.dateTime }}</p>
      <h3>{{ event.eventName }}</h3>
      <p>{{ event.cityName }}</p>
      <p>{{ event.countryName }}</p>
      <img :src="`${event.eventImageUrl}`" alt="event image" />
      <attend-event :eventId="event.eventId" />
      <delete-event :eventId="event.eventId" :hostId="event.hostId" />
      <router-link :to="`/event/${event.eventId}`">View Event</router-link>
      <!-- v-if="currentUserInfo.userId === event.hostId" -->
    </div>
  </div>
</template>

<script>
import DeleteEvent from "./DeleteEvent.vue";
import AttendEvent from "./AttendEvent.vue";
export default {
  name: "events-at-location",
  components: {
    DeleteEvent,
    AttendEvent,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    eventsAtLocation() {
      return this.$store.state.eventsAtLocation;
    },
  },
};
</script>

<style scoped></style>
