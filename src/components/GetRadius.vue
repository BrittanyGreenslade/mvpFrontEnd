<template>
  <div id="radiusPgCtr">
    <!-- might add ability to search event by keyword/name -->
    <div>
      <p id="distanceKm">
        Events within
        <input
          type="text"
          placeholder="distance (km)"
          list="radiusList"
          id="radiusInput"
        />
        <datalist id="radiusList">
          <option value="25"> </option>
          <option value="50"> </option>
          <option value="100"> </option>
        </datalist>
        km of <b>{{ searchCity.cityName }}, {{ searchCity.countryName }}</b>
      </p>
    </div>
    <button class="btn" @click="withinDistance(searchCity.locationId)">
      search cities
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "get-radius",
  props: {
    searchCity: Object,
  },

  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    allEvents() {
      return this.$store.state.allEvents;
    },
  },
  methods: {
    //chooses cities within distance chosen in input dropdown (25, 50, 100)
    withinDistance(locationId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/distance`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            cityLocationId: locationId,
            radius: document.getElementById("radiusInput").value,
            userId: this.currentUserInfo.userId,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.$store.dispatch("getEventsAtLocation", res.data[i].cityId);
            continue;
          }
          document.getElementById("radius").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
