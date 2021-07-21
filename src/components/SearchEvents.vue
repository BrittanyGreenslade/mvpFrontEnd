<template>
  <div>
    <search-city @myCustomEvent="handleChildUpdate" />
    <!-- <form autocomplete="off" action="javascript:void(0)" id="userCityInputForm">
      <input
        type="text"
        placeholder="search event city"
        required
        id="userCityInput"
        @keyup="checkLength"
      />
    </form>
    <div id="cityList">
      <div
        @click="selectCity(city)"
        v-for="city in potentialUserCities"
        :key="city.locationId"
      >
        <p>{{ city.cityName }}, {{ city.countryName }}</p>
      </div>
    </div> -->
    <p v-if="searchCity !== undefined" id="distanceKm">
      Events within
      <input
        type="text"
        placeholder="distance (km)"
        list="radiusList"
        id="radius"
      />
      <datalist id="radiusList">
        <option value="25"> </option>
        <option value="50"> </option>
        <option value="100"> </option>
      </datalist>
      km of {{ searchCity.cityName }}, {{ searchCity.countryName }}
      <button @click="withinDistance(searchCity.locationId)">
        search cities
      </button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import SearchCity from "./SearchCity.vue";
export default {
  components: { SearchCity },
  name: "search-events",
  data() {
    return {
      // potentialUserCities: [],
      searchCity: undefined,
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    allEvents() {
      return this.$store.state.allEvents;
    },
  },
  // methods: {
  //   selectCity(city) {
  //     //city user searched in input - used in html and searchCity.id
  //     //as argument in 'withinDistance' fn
  //     this.searchCity = city;
  //     document.getElementById("cityList").style.display = "none";
  //     document.getElementById("userCityInputForm").reset();
  //   },
  //   checkLength() {
  //     //checks len of the city input to make api call when length is 3 characters or more
  //     if (document.getElementById("userCityInput").value.length >= 3) {
  //       this.getCities();
  //     }
  //   },
  //   getCities() {
  //     axios
  //       .request({
  //         url: `${process.env.VUE_APP_API_URL}/location`,
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //         params: {
  //           firstThree: document.getElementById("userCityInput").value,
  //         },
  //       })
  //       .then((res) => {
  //         //just to show a list of city IDs locally based on the first 3 letters user typed
  //         this.potentialUserCities = res.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  methods: {
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    //chooses cities within distance chosen in input dropdown
    withinDistance(locationId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/distance`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            cityLocationId: locationId,
            radius: document.getElementById("radius").value,
            userId: this.currentUserInfo.userId,
          },
        })
        .then((res) => {
          //make the km selection go away after distance chosen
          document.getElementById("distanceKm").style.display = "none";
          for (let i = 0; i < res.data.length; i++) {
            //maybe look in len of allEvents before dispatching? but need to nest loops so prob not
            this.$store.dispatch("getEventsLocation", res.data[i].cityId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
