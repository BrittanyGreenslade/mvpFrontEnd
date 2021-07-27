<template>
  <div>
    <form class="formStyling" action="javascript:void(0)">
      <div class="titleContainer">
        <h1 class="landingTitle">Delete</h1>
        <h1 class="landingTitle">Account</h1>
      </div>
      <input
        class="landingInput"
        type="password"
        placeholder="password"
        id="deletePW"
      />
      <button class="btn" @click="deleteUser">
        <p>
          delete account
        </p>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-profile",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
  mounted() {
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
            password: document.getElementById("deletePW").value,
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          this.navigateToSignup();
          for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].userId === this.currentUserInfo.userId) {
              this.$store.commit("deleteUser", i);
            }
          }
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", undefined);
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", undefined);
          this.loginStatus = "Profile deleted! Redirecting...";
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.formStyling {
  width: 100%;
}
</style>
