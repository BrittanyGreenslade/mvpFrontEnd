<template>
  <div>
    <form action="javascript:void(0)">
      <h2>Enter password to delete account</h2>
      <input type="password" placeholder="password" />
      <button @click="deleteUser">Delete user account</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-profile",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  mounted() {
    //do a check to see if allUsers isn't undefined?
    if (this.$store.state.allUsers === undefined) {
      this.$store.dispatch("getUsers");
    }
  },
  methods: {
    navigateToSignup() {
      this.$router.push({ name: "Signup" });
    },
    deleteUser() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            password: document.getElementById("password").value,
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          this.navigateToSignup();
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", undefined);
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", undefined);
          this.loginStatus = "Profile deleted! Redirecting...";
          console.log(this.allUsers);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(this.loginToken);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
