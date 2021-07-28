<template>
  <div id="thisPgCtr">
    <h3 class="notifyNoEvents" v-if="eventsNearLocation.length === 0">
      No events listed near this location
    </h3>
    <div>
      <p class="backBtn" @click="notifyParent">Home</p>
      <div class="eventContainerParent">
        <div
          class="eventContainer"
          v-for="event in eventsNearLocation"
          :key="event.eventId"
        >
          <div class="eventContainerChild">
            <div class="genGrid">
              <p>{{ event.dateTime }} (UTC)</p>
              <router-link :to="`/event/${event.eventId}`">
                <h3 class="eventName">{{ event.eventName }}</h3></router-link
              >
              <p>
                Host:
                <router-link
                  class="hostLink"
                  :to="`/profile/${event.hostId}`"
                  >{{ event.hostName }}</router-link
                >
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
  </div>
</template>

<script>
export default {
  name: "events-near-location",
  props: {
    eventCity: Object,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    eventsNearLocation() {
      return this.$store.state.eventsNearLocation;
    },
  },
  methods: {
    notifyParent() {
      this.$emit("togglePgView", true);
    },
  },
};
</script>

<style scoped>
.genGrid p:nth-child(1) {
  font-size: 14px;
}
.pgCtr {
  overflow: scroll;
  grid-auto-flow: row;
  margin-bottom: 20px;
}
#thisPgCtr {
  display: grid;
}
.backBtn {
  margin: 30px 0 5px 30px;
}
</style>
