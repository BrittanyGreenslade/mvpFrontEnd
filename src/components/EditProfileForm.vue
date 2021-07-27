<template>
  <div id="pageCtr">
    <div>
      <router-link :to="`/profile/${currentUserInfo.userId}`">Back</router-link>
      <div class="titleContainer">
        <h1 class="landingTitle">Edit</h1>
        <h1 class="landingTitle">Profile</h1>
      </div>
      <form autocomplete="off" class="formStyling" action="javascript:void(0)">
        <input class="landingInput" type="text" id="name" placeholder="name" />
        <input
          class="landingInput"
          type="text"
          id="email"
          placeholder="email"
        />
        <input
          class="landingInput"
          type="password"
          id="password"
          placeholder="password"
        />
        <search-city @getLocationInfo="handleChildUpdate" />
        <textarea
          class="landingInput"
          type="text"
          id="bio"
          placeholder="bio max length 300 characters"
        />
        <input
          class="landingInput"
          type="text"
          id="imgUrl"
          placeholder="profile image URL"
        />
        <input
          class="landingInput"
          type="text"
          id="linkedInUrl"
          placeholder="LinkedIn url"
        />
        <button class="btn" @click="editProfile()" id="editBtn">
          <p>
            edit
          </p>
        </button>
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
    currentUserCity() {
      return this.$store.getters.currentUserCity;
    },
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
      //this is in case the user doesn't change their location info
      if (this.searchCity === undefined) {
        this.searchCity = this.currentUserCity;
      }
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
.titleContainer,
#deleteComp {
  margin-top: 40px;
}
#pageCtr {
  justify-self: center;
  margin-top: 20px;
  align-self: start;
}
#pageCtr div:nth-child(1),
#deleteComp {
  width: 90%;
}
#cityName {
  border: none;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid grey;
  justify-content: end;
}

.formStyling {
  width: 100%;
}
</style>
