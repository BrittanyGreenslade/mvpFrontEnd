<template>
  <div>
    <button
      class="btn"
      v-if="this.currentUserInfo.userId === this.hostId"
      @click="deleteEvent"
    >
      <p>
        delete event
      </p>
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "delete-event",
  props: {
    eventId: Number,
    hostId: Number,
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    allEvents() {
      return this.$store.state.allEvents;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  mounted() {
    if (this.$store.state.allEvents === undefined) {
      this.$store.dispatch("getAllEvents");
    }
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
          // this.navigateToSignup();
          for (let i = 0; i < this.allEvents.length; i++) {
            if (this.allEvents[i].eventId === this.eventId) {
              this.$store.commit("deleteEvent", i);
            }
          }
          this.$router.push({
            path: "/home",
          });

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
.btn {
  width: 100px;
}
</style>
