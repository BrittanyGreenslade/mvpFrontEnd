<template>
  <div>
    <h2>Future Events</h2>
    <div v-for="event in usersFutureEvents" :key="event.eventId">
      <p>{{ event.dateTime }}</p>
      <h3>{{ event.eventName }}</h3>
      <p>{{ event.cityName }}</p>
      <p>{{ event.countryName }}</p>
      <img :src="`${event.eventImageUrl}`" alt="event image" />
      <delete-event :eventId="event.eventId" :hostId="event.hostId" />
      <attend-event :eventId="event.eventId" />
    </div>
  </div>
</template>

<script>
import DeleteEvent from "./DeleteEvent.vue";
import AttendEvent from "./AttendEvent.vue";
export default {
  components: { DeleteEvent, AttendEvent },
  name: "future-user-events",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    usersFutureEvents() {
      return this.$store.getters.usersFutureEvents;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  mounted() {
    //change id to the prop here when there is one
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", this.currentUserInfo.userId);
    }
  },
  methods: {},
};
</script>

<style scoped></style>
