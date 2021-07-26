<template>
  <div id="pgCtr">
    <h1>Maybe scrolly pics</h1>
    <search-city @getLocationInfo="handleChildUpdate" id="searchBar" />
    <get-radius
      id="radius"
      v-if="searchCity !== undefined"
      :searchCity="searchCity"
    />
    <all-events v-if="eventsNearLocation === undefined" />
    <events-near-location
      v-else
      @toggleEventsNearLocationView="handleEventsChildUpdate"
    />
  </div>
</template>

<script>
import GetRadius from "../components/GetRadius.vue";
import AllEvents from "../components/AllEvents.vue";
import EventsNearLocation from "../components/EventsNearLocation.vue";
import SearchCity from "../components/SearchCity.vue";
export default {
  name: "home",
  data() {
    return {
      searchCity: undefined,
    };
  },
  computed: {
    eventsNearLocation() {
      return this.$store.state.eventsNearLocation;
    },
  },
  components: {
    AllEvents,
    SearchCity,
    EventsNearLocation,
    GetRadius,
  },
  methods: {
    handleEventsChildUpdate() {
      this.$store.commit("eventsNearLocationUndef", undefined);
      document.getElementById("cityName").value = "";
    },
    handleChildUpdate(data) {
      this.searchCity = data;
    },
  },
};
</script>

<style scoped>
#pgCtr {
  grid-template-rows: 1fr 0.5fr 70%;
  margin-bottom: 20px;
}
#searchBar {
  align-self: end;
  width: 80%;
  place-self: center;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 20px;
  height: 20px;
  border: 1px solid grey;
}
#radius {
  border: 1px solid black;
  width: 75%;
  left: 9%;
  position: absolute;
  background: white;
  top: 43.5%;
  height: 75px;
  display: grid;

  padding: 10px;
}
</style>
