<template>
  <div>
    <div class="eventContainerChild">
      <img class="eventImg" :src="`${event.eventImageUrl}`" alt="event image" />
      <h3>Host: {{ event.hostName }}</h3>
    </div>
    <!-- <img :src="`${event.hostImageUrl}`" alt="event host image" /> -->

    <h1>{{ event.eventName }}</h1>
    <hr />
    <div id="eventInfoCtr">
      <p class="bold">{{ event.dateTime }}</p>
      <h3>{{ event.cityName }}</h3>
      <h3>{{ event.countryName }}</h3>
      <!-- <h3>(Number attending)</h3> -->
    </div>
    <attend-event :eventId="Number(eventId)" />
    <h3>{{ event.description }}</h3>
    <hr />
    <div class="btnContainer">
      <button class="btn">
        <router-link class="btn" to="/editEvent">edit</router-link>
      </button>
      <delete-event class="btn" :hostId="event.hostId" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AttendEvent from "./AttendEvent.vue";
import DeleteEvent from "./DeleteEvent.vue";
export default {
  name: "event-profile",
  components: {
    AttendEvent,
    DeleteEvent,
  },
  data() {
    return {
      event: {},
    };
  },
  computed: {
    //remember: this is returned as a string so need to convert it
    eventId() {
      return this.$route.params.eventId;
    },

    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  mounted() {
    console.log(this.event);
    console.log(this.eventId);
    console.log(this.usersEvents);
    //why is userEvents always undefined even when it's navigating from a page where
    //the call to get userEvents happens
    if (this.usersEvents === undefined) {
      this.getOneEvent(Number(this.eventId));
    } else {
      this.oneEvent();
    }
  },
  methods: {
    //if userEvents isn't empty, this will filter through to find the event id of
    //this path and make that the event stored in this page's data
    oneEvent() {
      for (let i = 0; i < this.usersEvents.length; i++) {
        if (this.usersEvents[i].eventId === Number(this.eventId)) {
          this.event = this.usersEvents[i];
          return;
          //anything after this won't happen if event is found
        }
      }
      this.getOneEvent(this.eventId);
    },
    getOneEvent(eventId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            eventId: eventId,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.event = res.data[i];
            console.log(res.data[i]);
          }

          console.log(this.event);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.eventImg {
  width: 80px;
}
.eventContainerChild {
  place-items: center;
}
.btn {
  place-self: center;
  width: 100px;
}
#eventInfoCtr {
  display: grid;
  row-gap: 10px;
  margin-top: 20px;
}
</style>
