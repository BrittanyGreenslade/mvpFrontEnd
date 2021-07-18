<template>
  <div>
    <button v-if="attending === false" @click="atttendEvent">attend</button>
    <button v-else @click="attending === false">unattend</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "attend-event",
  props: {
    eventId: Number,
  },
  data() {
    return {
      attending: false,
    };
  },

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  mounted() {
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", this.currentUserInfo.userId);
    }
  },
  methods: {
    atttendEvent() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users-events`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            loginToken: this.loginToken,
            eventId: this.eventId,
          },
        })
        .then((res) => {
          this.$store.commit("addUserEvent", res.data);
          for (let i = 0; i < this.usersEvents.length; i++) {
            if (this.usersEvents.eventId === this.eventId) {
              this.attending == true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //       unattendEvent() {
      // axios
      //   .request({
      //     url: `${process.env.VUE_APP_API_URL}/users-events`,
      //     method: "DELETE",
      //     headers: { "Content-Type": "application/json" },
      //     data: {
      //       loginToken: this.loginToken,
      //       eventId: this.eventId,
      //     },
      //   })
      //   .then((res) => {
      //     this.$store.commit("addUserEvent", res.data);
      //     for (let i = 0; i < this.usersEvents.length; i++) {
      //       if (this.usersEvents.eventId === this.eventId) {
      //         this.attending == true;
      //       }
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>

<style scoped></style>
