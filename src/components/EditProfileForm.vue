<template>
  <div id="pageCtr">
    <div>
      <div class="titleContainer">
        <h1 class="landingTitle">Edit Your</h1>
        <h1 class="landingTitle">Profile</h1>
      </div>
      <form
        class="formStyling"
        action="javascript:void(0)"
        id="editProfileForm"
      >
        <input class="otherInput" type="text" id="name" placeholder="name" />
        <input class="otherInput" type="text" id="email" placeholder="email" />
        <input
          class="otherInput"
          type="password"
          id="password"
          placeholder="password"
        />
        <input
          class="otherInput"
          type="text"
          id="cityName"
          placeholder="city name"
        />
        <input
          class="otherInput"
          type="text"
          id="countryName"
          placeholder="country name"
        />
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
export default {
  components: { DeleteProfile },
  name: "edit-profile-form",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  methods: {
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
            cityName: document.getElementById("cityName").value,
            countryName: document.getElementById("countryName").value,
            loginToken: this.loginToken,
            imageUrl: document.getElementById("imgUrl").value,
            linkedInUrl: document.getElementById("linkedInUrl").value,
            bio: document.getElementById("bio").value,
          },
        })
        .then((res) => {
          cookies.set("currentUserInfo", res.data);
          this.$store.commit("updateCurrentUserInfo", res.data);
          // this.navigateToProfile();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#pageCtr {
  justify-self: center;
  margin-top: 50px;
  display: grid;
  place-items: center;
  width: 90%;
}
#pageCtr div:nth-child(1),
#deleteComp {
  width: 90%;
}
.formStyling {
  width: 100%;
}
</style>
