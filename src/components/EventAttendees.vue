<template>
  <div>
    <p id="attending" @click="attendeeListView = true">
      Attending: {{ attendees.length }}
    </p>
    <div id="listContainer" v-if="attendeeListView === true">
      <img
        @click="attendeeListView = false"
        class="actionIcon"
        src="../assets/close.svg"
        alt="close button"
      />
      <div class="titleContainer">
        <h1 class="landingTitle">Event</h1>
        <h1 class="landingTitle">Attendees</h1>
      </div>
      <div class="attendeesContainer">
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
            eventId: Number(this.eventId),
          },
        })
        .then((res) => {
          this.attendees = res.data;
          this.$emit("getNumAttending", res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
a {
  align-self: center;
}
.eventContainerChild img:nth-child(1) {
  border-radius: 50%;
  width: 70px;
}
.eventContainerChild {
  height: 70px;
  margin-left: 2%;
  grid-template-columns: 1.5fr 2fr;
  border-bottom: 1px solid #9e49cf;
  margin-bottom: 10px;
  padding-bottom: 5%;
}
.actionIcon {
  justify-self: end;
  margin-right: 15px;
  margin-bottom: 20px;
}
#attending {
  color: #ffff00;
  text-decoration: none;
  font-weight: bold;
}
.landingTitle {
  font-size: 30px;
}
.titleContainer {
  margin-left: 30px;
}
.attendeesContainer {
  justify-self: center;
  width: 90%;
}
.attendeesContainer:last-child {
  border-bottom: none;
}
#listContainer {
  display: grid;
  grid-auto-rows: 80px 120px auto;
  top: 100px;
  height: 80%;
  width: 80%;
  border-radius: 15px;
  overflow: scroll;
  position: absolute;
  background: #0d1116;
  border: 2px solid grey;
}
</style>
