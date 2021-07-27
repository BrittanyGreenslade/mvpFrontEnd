<template>
  <div class="componentCtr">
    <!-- <router-link to="/home">Home</router-link> -->
    <form autocomplete="off" class="formStyling" action="javascript:void(0)">
      <div class="titleContainer">
        <h1 class="landingTitle">Create An</h1>
        <h1 class="landingTitle">Event</h1>
      </div>
      <div>
        <h3>Event Name</h3>
        <input
          placeholder="event name"
          class="landingInput"
          type="text"
          required
          id="eventName"
        />
      </div>
      <div>
        <h3>Event City</h3>
        <search-city @getLocationInfo="handleChildUpdate" />
      </div>
      <!-- returns a DOMstring -->
      <div>
        <h3>Event Date & Time</h3>
        <input
          required
          class="landingInput"
          type="datetime-local"
          id="dateTime"
        />
      </div>
      <div>
        <h3>Event Image</h3>
        <input
          class="landingInput"
          type="text"
          placeholder="image URL"
          id="eventImg"
        />
      </div>
      <div>
        <h3>Event Description</h3>
        <textarea
          maxlength="500"
          minlength="1"
          class="landingInput"
          type="text"
          required
          placeholder="description max length 500 characters"
          id="description"
        />
      </div>
      <div class="btnContainer">
        <button class="btn">
          <router-link to="/home">cancel</router-link>
        </button>
        <button class="btn" @click="createEvent">
          <p>
            create event
          </p>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import SearchCity from "./SearchCity.vue";
import axios from "axios";
export default {
  name: "create-event-form",
  components: {
    SearchCity,
  },
  data() {
    return {
      params: undefined,
      searchCity: undefined,
    };
  },
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
    handleChildUpdate(data) {
      this.searchCity = data;
    },
    createParams() {
      if (document.getElementById("eventImg").value !== null) {
        this.params = {
          loginToken: this.loginToken,
          eventName: document.getElementById("eventName").value,
          dateTime: document.getElementById("dateTime").value,
          cityName: this.searchCity.cityName,
          countryName: this.searchCity.countryName,
          eventImageUrl: document.getElementById("eventImg").value,
          description: document.getElementById("description").value,
        };
      } else {
        this.params = {
          loginToken: this.loginToken,
          eventName: document.getElementById("eventName").value,
          dateTime: document.getElementById("dateTime").value,
          cityName: document.getElementById("cityName").value,
          countryName: document.getElementById("countryName").value,
          description: document.getElementById("description").value,
        };
      }
    },
    createEvent() {
      this.createParams();
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: this.params,
        })
        .then((res) => {
          this.$store.commit("userCreateEvent", res.data);
          this.$router.push({ path: `/home` });
        })
        .catch((err) => {
          console.log(this.params);
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
.landingInput,
#citySearchCtr {
  margin-top: 5px;
}
.formStyling {
  align-self: start;
  height: 90%;
}
</style>
