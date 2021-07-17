<template>
  <div>
    <form action="javascript:void(0)">
      <input type="text" placeholder="event name" required id="eventName" />
      <input type="text" placeholder="city name" id="cityName" />
      <input type="text" placeholder="country name" id="countryName" />
      <input
        type="text"
        placeholder="description max length 500 characters"
        id="description"
      />
      <input type="text" placeholder="event image url" id="eventImg" />
      <!-- returns a DOMstring -->
      <input type="datetime-local" id="dateTime" />
      <!-- maybe put duration? -->
      <button id="createEventBtn" @click="createEvent">create event</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-event-form",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
    allEvents() {
      return this.$store.state.allEvents;
    },
  },
  methods: {
    createEvent() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            loginToken: this.loginToken,
            eventName: document.getElementById("eventName").value,
            dateTime: document.getElementById("dateTime").value,
            cityName: document.getElementById("cityName").value,
            countryName: document.getElementById("countryName").value,
            eventImageUrl: document.getElementById("eventImg").value,
            description: document.getElementById("description").value,
          },
        })
        .then((res) => {
          this.$store.commit("addUserEvent", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
