<template>
  <div>
    <h1>Edit profile</h1>
    <form action="javascript:void(0)" id="editProfileForm">
      <input type="text" id="name" placeholder="name" />
      <input type="text" id="email" placeholder="email" />
      <input type="password" id="password" placeholder="password" />
      <input type="text" id="cityName" placeholder="city name" />
      <input type="text" id="countryName" placeholder="country name" />
      <input type="text" id="bio" placeholder="bio max length 300 characters" />
      <input type="text" id="imgUrl" placeholder="link to profile img" />
      <input type="text" id="linkedInUrl" placeholder="LinkedIn url" />
      <button @click="editProfile" id="editBtn">edit</button>
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

<style scoped></style>
