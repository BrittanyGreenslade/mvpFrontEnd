<template>
  <div class="genGrid">
    <button class="btn" v-if="attending === false" @click="attendEvent">
      <p>
        attend
      </p>
    </button>
    <button class="btn" v-else @click="unattendEvent">
      <p>
        unattend
      </p>
    </button>
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
    } else {
      this.checkEventAttending();
    }
  },
  watch: {
    usersEvents(newValue, oldValue) {
      for (let i = 0; i < newValue.length; i++) {
        if (newValue[i].eventId === this.eventId) {
          this.attending = true;
        }
      }
      oldValue;
    },
  },
  methods: {
    checkEventAttending() {
      for (let i = 0; i < this.usersEvents.length; i++) {
        if (this.usersEvents[i].eventId === this.eventId) {
          this.attending = true;
        }
      }
    },
    attendEvent() {
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
          this.attending = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unattendEvent() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users-events`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            loginToken: this.loginToken,
            eventId: this.eventId,
          },
        })
        .then((res) => {
          this.attending = false;
          for (let i = 0; i < this.usersEvents.length; i++) {
            if (this.usersEvents[i].eventId === this.eventId) {
              this.$store.commit("deleteUserEvent", i);
              break;
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

<style scoped></style>
