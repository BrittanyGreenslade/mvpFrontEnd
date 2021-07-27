<template>
  <div>
    <div class="eventContainerParent">
      <h3 class="notifyNoEvents" v-if="usersFutureEvents.length === 0">
        This user is not registed for any future events
      </h3>
      <div
        class="eventContainer"
        v-for="event in usersFutureEvents"
        :key="event.eventId"
      >
        <div class="eventContainerChild">
          <div class="genGrid">
            <p class="bold">{{ event.dateTime }}</p>
            <router-link :to="`/event/${event.eventId}`">
              <h3 class="eventName">{{ event.eventName }}</h3></router-link
            >
            <!-- <h3 class="eventName">{{ event.eventName }}</h3> -->
            <p>
              <b>Host: </b>
              <router-link :to="`/event/${event.hostId}`">{{
                event.hostName
              }}</router-link>
            </p>

            <p class="locationName">
              {{ event.cityName }}, {{ event.countryName }}
            </p>
          </div>
          <img :src="`${event.eventImageUrl}`" alt="event image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "future-user-events",
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    usersFutureEvents() {
      return this.$store.getters.usersFutureEvents;
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

<style scoped></style>
