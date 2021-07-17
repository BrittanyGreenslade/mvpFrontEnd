<template>
  <div>
    <h1>Edit profile</h1>
    <form action="javascript:void(0)" id="signupForm">
      <input type="text" id="name" placeholder="name" />
      <input type="text" id="email" placeholder="email" />
      <input type="password" id="password" placeholder="password" />
      <input type="text" id="cityName" placeholder="city name" />
      <input type="text" id="countryName" placeholder="country name" />
      <input type="text" id="bio" placeholder="bio max length 300 characters" />
      <!-- maybe user bio -->
      <input
        @click="editProfile"
        type="submit"
        id="editBtn"
        placeholder="edit"
      />
    </form>
    <delete-profile />
  </div>
</template>

<script>
import DeleteProfile from "./DeleteProfile.vue";
import axios from "axios";
import cookies from "vue-cookies";
export default {
  components: { DeleteProfile },
  name: "edit-profile",
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

<style scoped></style>
