<template>
  <div>
    <button
      class="btn"
      v-if="this.currentUserInfo.userId === this.hostId"
      @click="deleteEvent"
    >
      delete event
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
    //do a check to see if allUsers isn't undefined?
    if (this.$store.state.allEvents === undefined) {
      this.$store.dispatch("getAllEvents");
    }
  },
  methods: {
    // spliceEvent(allEvents) {
    //   for (let i = 0; i < allEvents.length; i++) {
    //     if (allEvents[i].eventId === this.eventId) {
    //       allEvents.splice(i, 1);
    //     }
    //   }
    // },
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
            if (this.allEvents[i].userId === this.eventId) {
              this.$store.commit("deleteEvent", i);
            }
          }
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
