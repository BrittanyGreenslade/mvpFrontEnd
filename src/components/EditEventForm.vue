<template>
  <div id="pageCtr">
    <div>
      <router-link id="backBtn" to="/home">Back</router-link>
      <div class="titleContainer">
        <h1 class="landingTitle">Edit</h1>
        <h1 class="landingTitle">Event</h1>
      </div>
      <form class="formStyling" action="javascript:void(0)">
        <input
          class="otherInput"
          type="text"
          id="eventName"
          placeholder="event name"
        />
        <input
          class="otherInput"
          type="text"
          id="description"
          placeholder="description"
        />
        <input class="otherInput" type="datetime-local" id="dateTime" />
        <input
          class="otherInput"
          type="password"
          id="eventImageUrl"
          placeholder="event img url"
        />
        <input
          class="otherInput"
          type="text"
          id="cityName"
          placeholder="city name"
        />
        <button class="btn" @click="editEvent" id="editBtn">edit</button>
      </form>
    </div>
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/* .genGrid {
  justify-items: center;
} */
#pageCtr {
  height: 70%;
  justify-self: center;
  margin-top: 50px;
  justify-items: center;
}
#pageCtr div:nth-child(1) {
  height: auto;
  width: 90%;
}
.formStyling {
  width: 100%;
}
</style>
