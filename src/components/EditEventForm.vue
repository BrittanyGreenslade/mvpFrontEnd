<template>
  <div id="pageCtr">
    <div>
      <router-link class="backLink" id="backBtn" to="/home">Back</router-link>
      <div class="titleContainer">
        <h1 class="landingTitle">Edit</h1>
        <h1 class="landingTitle">Event</h1>
      </div>
      <form autocomplete="off" class="formStyling" action="javascript:void(0)">
        <input
          class="landingInput"
          type="text"
          id="eventName"
          placeholder="event name"
        />
        <input
          class="landingInput"
          type="text"
          id="description"
          placeholder="description"
        />
        <input class="landingInput" type="datetime-local" id="dateTime" />
        <input
          class="landingInput"
          type="password"
          id="eventImageUrl"
          placeholder="event img url"
        />
        <search-city @getLocationInfo="handleChildUpdate" />
        <button class="btn" @click="editEvent" id="editBtn">
          <p>
            edit
          </p>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import SearchCity from "./SearchCity.vue";
import axios from "axios";
export default {
  name: "edit-event",
  components: {
    SearchCity,
  },
  data() {
    return {
      searchCity: undefined,
    };
  },
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
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    editEvent() {
      axios
        .request({
          url: `api/events`,
          // url: `${process.env.VUE_APP_API_URL}/events`,
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
.titleContainer {
  margin-top: 40px;
}
#pageCtr {
  height: 70%;
  justify-self: center;
  margin-top: 50px;
  justify-items: center;
  align-self: start;
}
#pageCtr div:nth-child(1) {
  height: auto;
  width: 90%;
}
.formStyling {
  width: 100%;
}
</style>
