<template>
  <div class="componentCtr">
    <!-- ignore for now -->
    <div class="formParent">
      <form
        autocomplete="off"
        action="javascript:void(0)"
        id="userCityInputForm"
      >
        <input
          type="text"
          placeholder="city name"
          required
          id="userCityInput"
          class="otherInput"
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
  methods: {
    notifyParent() {
      this.$emit("customEvent", this.searchCity);
    },
    selectCity(city) {
      //city user searched in input - used in html and searchCity.id
      //as argument in 'withinDistance' fn
      this.searchCity = city;
      document.getElementById("cityList").style.display = "none";
      document.getElementById("userCityInputForm").reset();
      this.notifyParent();
    },
    checkLength() {
      //checks len of the city input to make api call when length is 3 characters or more
      if (document.getElementById("userCityInput").value.length >= 3) {
        this.getCities();
      }
    },
    getCities() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/location`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            firstThree: document.getElementById("userCityInput").value,
          },
        })
        .then((res) => {
          //just to show a list of city IDs locally based on the first 3 letters user typed
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
.componentCtr {
  min-height: 10vh;
}
.formParent {
  display: grid;
  width: 100%;
  place-items: center;
}
#userCityInputForm {
  width: 70%;
}
</style>
