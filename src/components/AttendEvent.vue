<template>
  <div>
    <button @click="atttendEvent">attend</button>
  </div>
  <!-- logic for only being able to attend event once -->
</template>

<script>
import axios from "axios";
export default {
  name: "attend-event",
  props: {
    eventId: Number,
  },

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(this.loginToken);
          console.log(typeof this.eventId);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
