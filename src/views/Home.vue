<template>
  <div class="pgCtr">
    <img
      id="heroPic"
      src="../assets/heroPic.jpg"
      alt="interconnected earth with binary numbers"
    />
    <search-city
      v-if="eventsNearLocation === undefined"
      @togglePageView="handleToggleUpdate"
      @getLocationInfo="handleChildUpdate"
      id="searchBar"
    />
    <get-radius
      @toggleSearchCity="handleRadiusUpdate"
      id="radius"
      v-if="searchCity !== undefined"
      :searchCity="searchCity"
    />
    <all-events v-if="allEventsView === true" />
    <div v-else>
      <events-near-location
        @togglePgView="handleTogglePgView"
        :eventCity="searchCity"
      />
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
      allEventsView: true,
    };
  },
  computed: {
    eventsNearLocation() {
      return this.$store.state.eventsNearLocation;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
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
      // this.$store.commit("eventsNearLocationTog", undefined);
      document.getElementById("cityName").value = "";
    },
    //changes view of the page to have all cities or cities searched
    eventsNearLocationToggle() {
      // this.$store.commit("eventsNearLocationTog", undefined);
      this.allEventsView = true;
    },
    //gets the search city from the search bar component
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    //changes view of page when cities are searched
    handleToggleUpdate(data) {
      this.allEventsView = data;
    },
    //changes view back when events at location closed
    handleTogglePgView(data) {
      this.allEventsView = data;
      this.$store.commit("updateEventsNearLocation", undefined);
    },
  },
};
</script>

<style scoped>
.pgCtr {
  grid-template-rows: 300px 120px minmax(50%, 100%);
  margin-bottom: 20px;
  min-height: 80vh;
}
#searchBar {
  margin-left: 8%;
}
#heroPic {
  width: 100%;
  height: 100%;
  place-self: center;
}
#radius {
  border: 1px solid #be9759;
  width: 78%;
  justify-self: center;
  /* position: relative; */
  background: #0d1116;
  /* top: -22px; */
  height: 100px;
  display: grid;
  padding: 10px;
}
</style>
