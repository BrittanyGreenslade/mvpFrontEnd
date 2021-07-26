<template>
  <div class="genGrid">
    <div class="eventContainerParent">
      <h3 v-if="usersPastEvents.length === 0">
        This user has not attended any events
      </h3>
      <div
        class="eventContainer"
        v-for="event in usersPastEvents"
        :key="event.eventId"
      >
        <div class="eventContainerChild">
          <div class="genGrid">
            <p class="bold">{{ event.dateTime }}</p>
            <h3>{{ event.eventName }}</h3>
            <p>{{ event.hostName }}</p>
            <!-- add number of people attending maybe? -->
            <p>{{ event.cityName }}, {{ event.countryName }}</p>
            <router-link :to="`/event/${event.eventId}`"
              >View Event</router-link
            >
          </div>
          <img :src="`${event.eventImageUrl}`" alt="event image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "past-user-events",
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    usersPastEvents() {
      return this.$store.getters.usersPastEvents;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  mounted() {
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", Number(this.userId));
    }
  },
};
</script>

<style scoped>
.eventContainerParent h3:nth-child(1) {
  place-self: center;
  margin-top: 40px;
  width: 80%;
  text-align: center;
}
</style>
