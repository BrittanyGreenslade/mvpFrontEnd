<template>
  <div>
    <h1>Edit event</h1>
    <form action="javascript:void(0)" id="editEventForm">
      <input type="text" id="eventName" placeholder="event name" />
      <input type="text" id="description" placeholder="description" />
      <input type="datetime-local" id="dateTime" />
      <input type="password" id="eventImageUrl" placeholder="event img url" />
      <input type="text" id="cityName" placeholder="city name" />
      <input type="text" id="countryName" placeholder="country name" />
      <button @click="editEvent" id="editBtn">edit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-event",
  computed: {
    eventId() {
      return this.$route.params.eventId;
    },
    allEvents() {
      return this.$store.state.allEvents;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  methods: {
    editEvent() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            eventName: document.getElementById("eventName").value,
            description: document.getElementById("description").value,
            dateTime: document.getElementById("dateTime").value,
            eventImageUrl: document.getElementById("eventImageUrl").value,
            cityName: document.getElementById("cityName").value,
            countryName: document.getElementById("countryName").value,
            eventId: Number(this.eventId),
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          for (let i = 0; i < this.allEvents.length; i++) {
            if (this.allEvents[i].eventId === Number(this.eventId)) {
              this.allEvents[i] = res.data;
            }
          }
          //error in SQL syntax
          // this.navigateToProfile();
        })
        .catch((err) => {
          console.log(this.eventId);
          console.log(this.loginToken);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
