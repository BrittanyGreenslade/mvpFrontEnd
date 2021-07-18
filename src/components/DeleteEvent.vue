<template>
  <div></div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-event",
  props: {
    eventId: Number,
  },
  methods: {
    deleteEvent() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            loginToken: this.loginToken,
            eventId: this.eventId,
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
