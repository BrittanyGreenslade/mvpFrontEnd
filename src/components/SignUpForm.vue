<template>
  <div class="componentCtr">
    <h2>Cool App Name</h2>
    <div class="titleContainer">
      <h1 class="landingTitle">Create</h1>
      <h1 class="landingTitle">Account</h1>
    </div>
    <form autocomplete="off" action="javascript:void(0)" class="userForm">
      <input
        class="landingInput"
        type="text"
        id="name"
        placeholder="name"
        required
      />
      <input
        class="landingInput"
        type="text"
        id="email"
        placeholder="email"
        required
      />
      <input
        class="landingInput"
        type="password"
        id="password"
        placeholder="password"
        required
      />
      <input
        class="landingInput"
        type="text"
        id="imageUrl"
        placeholder="profile image url"
      />
      <input
        class="landingInput"
        type="text"
        id="linkedInUrl"
        placeholder="LinkedIn url"
      />
      <textarea
        class="landingInput"
        type="text"
        id="bio"
        placeholder="bio max 300 characters"
        maxlength="300"
        minlength="1"
      />
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
      <search-city @getLocationInfo="handleChildUpdate" />
      <button @click="userSignup" class="btn">
        register
      </button>
    </form>
    <h3 class="landingNav">
      Already have an account? <router-link to="/login">Login</router-link>
    </h3>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import SearchCity from "./SearchCity.vue";
export default {
  components: { SearchCity },
  name: "sign-up-form",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  data() {
    return {
      potentialUserCities: [],
      searchCity: undefined,
    };
  },

  methods: {
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    navigateToHome() {
      this.$router.push({
        path: `/home`,
      });
    },
    // selectCity(city) {
    //   document.getElementById("cityList").style.display = "none";
    //   //keeps the city in the input so user can see what they've chosen
    //   document.getElementById(
    //     "cityName"
    //   ).value = `${city.cityName}, ${city.countryName}`;

    //   //city user searched in input - used in html and searchCity.id
    //   //as argument in 'withinDistance' fn
    //   //and as param in 'getUserCity' fn below
    //   this.searchCity = city;
    // },
    // checkLength() {
    //   //checks len of the city input to make api call when length is 3 characters or more
    //   if (document.getElementById("cityName").value.length >= 3) {
    //     this.getCities();
    //     document.getElementById("cityList").style.display = "grid";
    //     document.getElementById("cityList").style.position = "absolute";
    //   }
    // },
    // getCities() {
    //   axios
    //     .request({
    //       url: `${process.env.VUE_APP_API_URL}/location`,
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       params: {
    //         firstThree: document.getElementById("cityName").value,
    //       },
    //     })
    //     .then((res) => {
    //       //just to show a list of city IDs locally based on the first 3 letters user typed
    //       this.potentialUserCities = res.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    userSignup() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            cityName: this.searchCity.cityName,
            countryName: this.searchCity.countryName,
            bio: document.getElementById("bio").value,
          },
        })
        .then((res) => {
          cookies.set("currentUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateCurrentUserInfo", res.data);
          this.$store.commit("updateLoginToken", res.data.loginToken);
          this.navigateToHome();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.userForm {
  /* height: 70%; */
  row-gap: 10px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 2fr;
}
.componentCtr {
  grid-template-rows: 0.5fr 0.5fr 2fr 0.5fr;
}
textarea {
  height: 20px;
}
h2 {
  place-self: center;
}
#cityList {
  top: 30px;
  display: none;
  width: 100%;
  background: white;
  border: 1px solid grey;
  max-height: 92px;
  overflow: scroll;
}
#citySearchCtr {
  position: relative;
  width: 100%;
}
#bio {
  /* border: 1px solid grey; */
  margin-top: 10px;
  text-justify: center;
}
</style>
