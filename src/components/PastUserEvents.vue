<template>
  <div>
    <h2>Past Events</h2>
    <div v-for="event in usersPastEvents" :key="event.eventId">
      <router-link :to="`/event/${event.eventId}`">View Event</router-link>
      <p>{{ event.dateTime }}</p>
      <h3>{{ event.eventName }}</h3>
      <p>{{ event.cityName }}</p>
      <p>{{ event.countryName }}</p>
      <img :src="`${event.eventImageUrl}`" alt="event image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "past-user-events",

  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    usersPastEvents() {
      return this.$store.getters.usersPastEvents;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  mounted() {
    //do a check to see if userEvents isn't undefined?
    //change id to the prop here when there is one
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", this.currentUserInfo.userId);
    }
  },
};
</script>

<style scoped></style>
