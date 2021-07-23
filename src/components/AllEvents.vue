<template>
  <div>
    <div class="cmptHeader">
      <h1>Browse Events</h1>
      <button>
        <router-link to="/createEvent">Create Event</router-link>
      </button>
    </div>
    <div class="eventContainerParent">
      <div
        class="eventContainer"
        v-for="event in allEvents"
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
          <img
            class="eventImg"
            :src="`${event.eventImageUrl}`"
            alt="event image"
          />
        </div>
        <!-- <attend-event :eventId="event.eventId" />
      <delete-event :eventId="event.eventId" :hostId="event.hostId" /> -->
        <!-- v-if="currentUserInfo.userId === event.hostId" -->
      </div>
    </div>
  </div>
</template>

<script>
// import AttendEvent from "./AttendEvent.vue";
// import DeleteEvent from "./DeleteEvent.vue";
export default {
  // components: { AttendEvent, DeleteEvent },
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
    //do a check to see if allEvents isn't undefined?
    //change id to the prop here when there is one
    if (this.allEvents === undefined) {
      this.$store.dispatch("getAllEvents");
    }
  },
};
</script>

<style scoped>
.cmptHeader {
  display: grid;
  grid-template-columns: 2fr 1fr;
  place-items: center;
  width: 90%;
  margin-left: 20px;
}
.cmptHeader > h1 {
  place-self: start;
  margin-left: 10px;
}
</style>
