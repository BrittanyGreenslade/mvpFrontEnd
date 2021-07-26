<template>
  <div id="pgCtr">
    <h3 v-if="eventsNearLocation.length === 0">
      No events listed at this location
    </h3>
    <p @click="notifyParent">Home</p>
    <div class="eventContainerParent">
      <div
        class="eventContainer"
        v-for="event in eventsNearLocation"
        :key="event.eventId"
      >
        <div class="eventContainerChild">
          <div class="genGrid">
            <p class="bold">{{ event.dateTime }}</p>
            <h3>{{ event.eventName }}</h3>
            <p>
              <b><u>Host:</u></b> {{ event.hostName }}
            </p>
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
  name: "events-near-location",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    eventsNearLocation() {
      return this.$store.state.eventsNearLocation;
    },
  },
  watch: {
    eventsNearLocation(newValue, oldValue) {
      newValue, oldValue;
    },
  },
  methods: {
    notifyParent() {
      this.$emit("toggleEventsNearLocationView", undefined);
    },
  },
};
</script>

<style scoped>
#pgCtr {
  display: grid;
}
#pgCtr h3:nth-child(1) {
  place-self: center;
  margin-top: 40px;
  width: 80%;
  text-align: center;
}
.eventContainerParent {
  height: auto;
}
</style>
