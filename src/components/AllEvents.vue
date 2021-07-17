<template>
  <div>
    <div v-for="event in allEvents" :key="event.eventId">
      <p>{{ event.dateTime }}</p>
      <h3>{{ event.eventName }}</h3>
      <p>{{ event.cityName }}</p>
      <p>{{ event.countryName }}</p>
      <img :src="`${event.eventImageUrl}`" alt="event image" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "all-events",
  computed: {
    allEvents() {
      return this.$store.state.allEvents;
    },
  },
  mounted() {
    //do a check to see if userEvents isn't undefined?
    //change id to the prop here when there is one
    if (this.allEvents === undefined) {
      this.getAllEvents();
    }
  },
  methods: {
    getAllEvents() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          this.$store.commit("updateAllEvents", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
