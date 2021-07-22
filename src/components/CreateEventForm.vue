<template>
  <div class="componentCtr">
    <router-link to="/home">Home</router-link>
    <form class="createEventForm" action="javascript:void(0)">
      <div>
        <h3>Event Name</h3>
        <input
          class="otherInput"
          type="text"
          placeholder="event name"
          required
          id="eventName"
        />
      </div>
      <div>
        <h3>Event City</h3>
        <input
          class="otherInput"
          type="text"
          placeholder="city name"
          id="cityName"
        />
      </div>
      <!-- returns a DOMstring -->
      <div>
        <h3>Event Date & Time</h3>
        <input class="otherInput" type="datetime-local" id="dateTime" />
      </div>
      <div>
        <h3>Event Image</h3>
        <input
          class="otherInput"
          type="text"
          placeholder="event image url"
          id="eventImg"
        />
      </div>
      <!-- <h3>Event Country</h3>
      <input
        class="otherInput"
        type="text"
        placeholder="country name"
        id="countryName"
      /> -->
      <div>
        <h3>Event Description</h3>
        <textarea
          class="otherInput"
          type="text"
          placeholder="description max length 500 characters"
          id="description"
        />
      </div>
      <!-- maybe put duration? -->
      <div class="btnContainer">
        <router-link class="btn" to="/home">
          <button class="btn">cancel</button></router-link
        >

        <button class="btn" @click="createEvent">create event</button>
      </div>
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

<style scoped>
.createEventForm {
  display: grid;
  row-gap: 15px;
  place-self: center;
  width: 85%;
  /* margin-top: 30px; */
}
.componentCtr {
  min-height: 100%;
}
#description {
  height: 70px;
}
.btnContainer {
  display: grid;
  grid-auto-flow: column;
}
.btn {
  place-self: center;
  width: 100px;
}
</style>
