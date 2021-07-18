<template>
  <div>
    <div v-for="event in allEvents" :key="event.eventId">
      <p>{{ event.eventId }}</p>
      <p>{{ event.dateTime }}</p>
      <h3>{{ event.eventName }}</h3>
      <p>{{ event.cityName }}</p>
      <p>{{ event.countryName }}</p>
      <img :src="`${event.eventImageUrl}`" alt="event image" />
      <attend-event :eventId="event.eventId" />
      <delete-event :eventId="event.eventId" :hostId="event.hostId" />
      <router-link
        :to="`/event/${event.eventId}`"
        v-if="currentUserInfo.userId === event.hostId"
        >View Event</router-link
      >
    </div>
  </div>
</template>

<script>
import AttendEvent from "./AttendEvent.vue";
import DeleteEvent from "./DeleteEvent.vue";
export default {
  components: { AttendEvent, DeleteEvent },
  name: "all-events",
  computed: {
    allEvents() {
      return this.$store.state.allEvents;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  mounted() {
    //do a check to see if userEvents isn't undefined?
    //change id to the prop here when there is one
    if (this.allEvents === undefined) {
      this.$store.dispatch("getAllEvents");
    }
  },
  watch: {},
  methods: {},
};
</script>

<style scoped></style>
