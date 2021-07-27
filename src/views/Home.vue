<template>
  <div class="pgCtr">
    <img
      id="heroPic"
      src="../assets/heroPic.jpg"
      alt="interconnected earth with binary numbers"
    />
    <search-city
      v-if="eventsNearLocation === undefined"
      @getLocationInfo="handleChildUpdate"
      id="searchBar"
    />
    <get-radius
      @toggleSearchCity="handleRadiusUpdate"
      id="radius"
      v-if="searchCity !== undefined"
      :searchCity="searchCity"
    />
    <all-events v-if="eventsNearLocation === undefined" />
    <div v-else>
      <p class="backBtn" @click="eventsNearLocationToggle">Home</p>
      <events-near-location />
    </div>
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
    handleRadiusUpdate() {
      this.searchCity = undefined;
      //toggles view of list
      this.$store.commit("eventsNearLocationTog", undefined);
      document.getElementById("cityName").value = "";
    },
    //changes view of the page to have all cities or cities searched
    eventsNearLocationToggle() {
      this.$store.commit("eventsNearLocationTog", undefined);
      this.searchCity = undefined;
    },
    //gets the search city from the search bar component
    handleChildUpdate(data) {
      this.searchCity = data;
    },
  },
};
</script>

<style scoped>
.pgCtr {
  overflow: scroll;
  grid-template-rows: 300px 120px minmax(50%, 100%);
  margin-bottom: 20px;
}
.backBtn {
  margin: 30px 0 5px 30px;
  /* margin-left: 30px;
  margin-top: 30px; */
}
#heroPic {
  width: 100%;
  height: 100%;
  place-self: center;
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
