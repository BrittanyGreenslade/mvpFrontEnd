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
      <search-city @getLocationInfo="handleChildUpdate" />
      <button @click="userSignup" class="btn">
        <p>
          register
        </p>
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
