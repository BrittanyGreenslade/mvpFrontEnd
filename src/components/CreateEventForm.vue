<template>
  <div class="componentCtr">
    <!-- <router-link to="/home">Home</router-link> -->
    <form class="formStyling" action="javascript:void(0)">
      <div class="titleContainer">
        <h1 class="landingTitle">Create An</h1>
        <h1 class="landingTitle">Event</h1>
      </div>
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
.componentCtr {
  margin-top: 30px;
}
#description {
  height: 70px;
}
.btn {
  place-self: center;
  width: 100px;
}
.titleContainer {
  width: 90%;
  margin-bottom: 20px;
  margin-top: 20px;
}
.landingTitle {
  margin-left: 10px;
}
.formStyling {
  align-self: start;
  height: 90%;
}
</style>
