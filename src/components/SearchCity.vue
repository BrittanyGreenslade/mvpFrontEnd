<template>
  <!-- ignore for now -->
  <div id="citySearchCtr">
    <input
      autocomplete="off"
      type="text"
      placeholder="first 3 letters of city"
      class="landingInput"
      id="cityName"
      @keyup="checkLength"
    />

    <div id="cityList">
      <div
        @click="selectCity(city)"
        v-for="city in potentialUserCities"
        :key="city.locationId"
      >
        <p>{{ city.cityName }}, {{ city.countryName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "search-city",
  data() {
    return {
      potentialUserCities: [],
      searchCity: undefined,
    };
  },
  computed: {
    currentUserCity() {
      return this.$store.getters.currentUserCity;
    },
    routePath() {
      return this.$route.path;
    },
  },

  methods: {
    //this notifies the signup form, the edit profile form, and to the home view
    notifyParent() {
      this.$emit("getLocationInfo", this.searchCity);
    },
    toggleParentView() {
      this.$emit("togglePageView", false);
    },
    selectCity(city) {
      this.searchCity = city;
      document.getElementById("cityList").style.display = "none";
      //keeps the city in the input so user can see what they've chosen
      document.getElementById(
        "cityName"
      ).value = `${city.cityName}, ${city.countryName}`;
      this.notifyParent();
      //city user searched in input - used in html and searchCity.id
      //as argument in 'withinDistance' fn
      //and as param in 'getUserCity' fn below
    },
    checkLength() {
      if (document.getElementById("cityName").value.length < 1) {
        document.getElementById("cityList").style.display = "none";
      }
      this.toggleParentView();
      //checks len of the city input to make api call when length is 3 characters or more
      if (document.getElementById("cityName").value.length >= 3) {
        this.getCities();
        document.getElementById("cityList").style.display = "grid";
        document.getElementById("cityList").style.position = "absolute";
        document.getElementById("cityList").style.border = "1px solid #be9759";
      }
    },
    getCities() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/location`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            firstThree: document.getElementById("cityName").value,
          },
        })
        .then((res) => {
          //just to show a list of city IDs in local data based on the first 3+ letters user typed
          this.potentialUserCities = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.formParent {
  display: grid;
  width: 100%;
  place-items: center;
}
#cityName {
  background: none;
}
#userCityInputForm {
  width: auto;
}
#userCityInput {
  width: 80%;
}
#cityList {
  background: #0d1116;
  width: 80%;
}
</style>
