<template>
  <div>
    <p @click="attendeeListView = true">Attending: {{ attendees.length }}</p>
    <div id="listContainer" v-if="attendeeListView === true">
      <img
        @click="attendeeListView = false"
        class="actionIcon"
        src="../assets/close.svg"
        alt="close button"
      />
      <div
        class="eventContainerChild"
        v-for="attendee in attendees"
        :key="attendee.userId"
      >
        <img :src="`${attendee.imageUrl}`" alt="attendee's profile picture" />
        <router-link
          id="link to attendee's profile"
          :to="`/profile/${attendee.userId}`"
        >
          <h3>{{ attendee.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "event-attendees",
  data() {
    return {
      attendees: [],
      attendeeListView: false,
    };
  },
  computed: {
    eventId() {
      return this.$route.params.eventId;
    },
  },
  mounted() {
    this.getAttendees();
  },
  methods: {
    getAttendees() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events-users`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            eventId: this.eventId,
          },
        })
        .then((res) => {
          this.attendees = res.data;
          this.$emit("getNumAttending", res.data.length);
        })
        .catch((err) => {
          console.log(this.eventId);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  font-weight: bold;
  color: blue;
}
.eventContainerChild {
  grid-template-columns: 1.5fr 2fr;
  border: 1px solid grey;
}
.actionIcon {
  justify-self: end;
  margin-right: 15px;
  margin-bottom: 20px;
}
#listContainer {
  display: grid;
  top: 100px;
  height: 80%;
  width: 80%;
  border-radius: 15px;
  overflow: scroll;
  position: absolute;
  background: white;
  border: 2px solid grey;
}
</style>
