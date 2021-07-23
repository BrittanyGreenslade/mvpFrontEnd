<template>
  <div class="genGrid">
    <div class="eventContainerParent">
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
      <!-- <delete-event :eventId="event.eventId" :hostId="event.hostId" />
        <attend-event :eventId="event.eventId" /> -->
    </div>
  </div>
</template>

<script>
// import DeleteEvent from "./DeleteEvent.vue";
// import AttendEvent from "./AttendEvent.vue";
export default {
  name: "past-user-events",
  components: {
    // DeleteEvent,
    // AttendEvent,
  },

  computed: {
    userId() {
      return this.$route.params.userId;
    },
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
    //do a check to see if usersEvents isn't undefined
    //change id to the prop here when there is one?
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", this.userId);
    }
  },

  // methods: {
  //       checkUserEvents() {
  //     for (let i = 0; i < this.usersEvents.length; i++) {
  //       if (this.usersEvents[i].eventId === this.eventId) {
  //         this.attending = true;
  //       }
  //     }
  //   },
  // },
};
</script>

<style scoped></style>
