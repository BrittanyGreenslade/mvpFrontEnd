<template>
  <div id="pageCtr">
    <div>
      <router-link id="backBtn" to="/home">Back</router-link>
      <div class="titleContainer">
        <h1 class="landingTitle">Edit Your</h1>
        <h1 class="landingTitle">Profile</h1>
      </div>
      <form class="formStyling" action="javascript:void(0)">
        <input class="otherInput" type="text" id="name" placeholder="name" />
        <input class="otherInput" type="text" id="email" placeholder="email" />
        <input
          class="otherInput"
          type="password"
          id="password"
          placeholder="password"
        />
        <search-city id="searchBar" @getLocationInfo="handleChildUpdate" />
        <!-- <div id="citySearchCtr">
          <input
            type="text"
            placeholder="first 3 letters of your city"
            required
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
        </div> -->

        <!-- <input
          class="otherInput"
          type="text"
          id="cityName"
          placeholder="city name"
        /> -->
        <input
          class="otherInput"
          type="text"
          id="bio"
          placeholder="bio max length 300 characters"
        />
        <input
          class="otherInput"
          type="text"
          id="imgUrl"
          placeholder="link to profile img"
        />
        <input
          class="otherInput"
          type="text"
          id="linkedInUrl"
          placeholder="LinkedIn url"
        />
        <button class="btn" @click="editProfile" id="editBtn">edit</button>
      </form>
    </div>
    <delete-profile id="deleteComp" />
  </div>
</template>

<script>
import DeleteProfile from "./DeleteProfile.vue";
import axios from "axios";
import cookies from "vue-cookies";
import SearchCity from "./SearchCity.vue";
export default {
  components: { DeleteProfile, SearchCity },
  name: "edit-profile-form",
  data() {
    return {
      searchCity: undefined,
    };
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    editProfile() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            cityName: this.searchCity.cityName,
            countryName: this.searchCity.countryName,
            loginToken: this.loginToken,
            imageUrl: document.getElementById("imgUrl").value,
            linkedInUrl: document.getElementById("linkedInUrl").value,
            bio: document.getElementById("bio").value,
          },
        })
        .then((res) => {
          cookies.set("currentUserInfo", res.data);
          this.$store.commit("updateCurrentUserInfo", res.data);
          this.$router.push({
            path: `/profile/${this.currentUserInfo.userId}`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#searchBar {
  width: 93%;
}
#pageCtr {
  justify-self: center;
  margin-top: 20px;
}
#pageCtr div:nth-child(1),
#deleteComp {
  width: 90%;
}
.formStyling {
  width: 100%;
}
</style>
