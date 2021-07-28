<template>
  <div id="radiusPgCtr">
    <!-- might add ability to search event by keyword/name -->
    <div>
      <p id="distanceKm">
        Events within
      </p>
      <input
        type="text"
        placeholder="distance (km)"
        list="radiusList"
        id="radiusInput"
        class="landingInput"
      />
      <datalist autocomplete="off" id="radiusList">
        <option value="25"> </option>
        <option value="50"> </option>
        <option value="100"> </option>
      </datalist>
      <p>
        km of <b>{{ searchCity.cityName }}, {{ searchCity.countryName }}</b>
      </p>
    </div>
    <div class="btnContainer">
      <img
        @click="notifyParent"
        class="actionIcon"
        src="../assets/close.svg"
        alt="cancel city search"
      />
      <button class="btn" @click="withinDistance(searchCity.locationId)">
        <p>
          search cities
        </p>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "get-radius",
  props: {
    searchCity: Object,
  },
  data() {
    return {
      counter: 0,
      events: [],
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
  methods: {
    //this notifies the parent(home) then triggers the mutation in the store
    //to cancel the view of search cities list
    notifyParent() {
      this.$emit("toggleSearchCity");
    },

    //chooses cities within distance chosen in input dropdown (25, 50, 100)
    withinDistance(locationId) {
      this.counter = 0;
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
            //pass the id and how many cities are within that distance for fn below
            this.getEventsAtLocation(res.data[i].cityId, res.data.length);
          }
          document.getElementById("radius").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //watches for when the api call is done (when num cities is equal to the counter)
    //and THEN updates the store
    getEventsAtLocation(cityId, numCities) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events/location`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            locationId: cityId,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.events.push(res.data[i]);
          }
          this.counter += 1;
          if (this.counter === numCities) {
            this.$store.commit("updateEventsNearLocation", this.events);
          }
        })
        .catch((err) => {
          this.counter += 1;
          //if last api call fails, store won't be updated without this
          if (this.counter === numCities) {
            this.$store.commit("updateEventsNearLocation", this.events);
          }
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#radiusInput {
  width: 42%;
}
.btn {
  margin-right: 5px;
}
.landingInput {
  border: 1px solid grey;
  text-align: center;
}
</style>
