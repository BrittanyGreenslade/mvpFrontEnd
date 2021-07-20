<template>
  <div>
    <img src="" alt="event image" />
    <h3>{{ event.hostName }}</h3>
    <img :src="`${event.hostImage}`" alt="event host image" />

    <h1>{{ event.eventName }}</h1>
    <h3>{{ event.dateTime }}</h3>
    <h3>{{ event.cityName }}</h3>
    <h3>{{ event.countryName }}</h3>
    <h3>(Number attending)</h3>
    <h3>{{ event.description }}</h3>
    <attend-event :eventId="Number(eventId)" />
    <hr />
  </div>
</template>

<script>
import axios from "axios";
import AttendEvent from "./AttendEvent.vue";
export default {
  name: "event-profile",
  components: {
    AttendEvent,
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
