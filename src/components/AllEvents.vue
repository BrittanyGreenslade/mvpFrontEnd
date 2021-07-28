<template>
  <div>
    <div class="cmptHeader">
      <h1>All Events</h1>
      <button class="btn">
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
            <p>{{ event.dateTime }} (UTC)</p>
            <router-link class="eventName" :to="`/event/${event.eventId}`">
              <h3>{{ event.eventName }}</h3></router-link
            >

            <p>
              Host:
              <router-link class="hostLink" :to="`/profile/${event.hostId}`">{{
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
    if (this.allEvents === undefined) {
      this.$store.dispatch("getAllEvents");
    }
  },
};
</script>

<style scoped>
.genGrid p:nth-child(1) {
  font-size: 14px;
}
.btn {
  width: 90px;
}
.cmptHeader {
  display: grid;
  grid-template-columns: 2fr 1fr;
  place-items: center;
  width: 90%;
  margin-left: 20px;
  margin-top: 10px;
}
.cmptHeader > h1 {
  place-self: start;
  margin-left: 10px;
}
#imgEventCtr {
  display: grid;
  place-self: center;
}
#imgEventCtr img:nth-child(1) {
  width: 75px;
  place-self: center;
}
</style>
