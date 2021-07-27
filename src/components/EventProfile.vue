<template>
  <div id="compCtr">
    <router-link id="backBtn" to="/home">Back</router-link>
    <div class="eventContainerChild">
      <img class="eventImg" :src="`${event.eventImageUrl}`" alt="event image" />
      <h3>
        Host:
        <router-link :to="`/profile/${event.hostId}`">{{
          event.hostName
        }}</router-link>
      </h3>
    </div>
    <!-- <img :src="`${event.hostImageUrl}`" alt="event host image" /> -->
    <div id="eventCtr">
      <h1>{{ event.eventName }}</h1>
      <div id="eventInfoCtr">
        <h3>{{ eventDate }}</h3>
        <p id="date">{{ eventTime }} (UTC)</p>
        <h4>
          <i>{{ event.cityName }}, {{ event.countryName }}</i>
        </h4>
        <event-attendees />
        <!-- <h3>(Number attending)</h3> -->
      </div>
      <attend-event :eventId="Number(eventId)" />

      <p id="desc">{{ event.description }}</p>
      <div v-if="event.hostId === currentUserInfo.userId" class="btnContainer">
        <button class="btn">
          <router-link class="btn" to="/editEvent">edit</router-link>
        </button>
        <delete-event
          :eventId="event.eventId"
          class="btn"
          :hostId="event.hostId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AttendEvent from "./AttendEvent.vue";
import EventAttendees from "./EventAttendees.vue";
import DeleteEvent from "./DeleteEvent.vue";
export default {
  name: "event-profile",
  components: {
    EventAttendees,
    AttendEvent,
    DeleteEvent,
  },
  data() {
    return {
      event: {},
      eventTime: "",
      eventDate: "",
    };
  },
  computed: {
    //remember: this is returned as a string so need to convert it
    eventId() {
      return this.$route.params.eventId;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
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
        if (Number(this.usersEvents[i].eventId) === Number(this.eventId)) {
          this.event = this.usersEvents[i];
          //substring starts from index 0 and extracts up to the end number if given
          //but not including end num
          //if it's not given, it extracts the rest of the string
          this.eventDate = this.usersEvents[i].dateTime.substring(0, 10);
          this.eventTime = this.usersEvents[i].dateTime.substring(10);

          return;
          //anything after this won't happen if event is found
        }
      }
      this.getOneEvent(Number(this.eventId));
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
            this.eventDate = res.data[i].dateTime.substring(0, 10);
            this.eventTime = res.data[i].dateTime.substring(10);
          }
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
#date {
  font-size: 14px;
}

#compCtr {
  height: 100%;
  width: 80%;
  justify-self: center;
  margin-top: 30px;
}
h1 {
  font-weight: 900;
  color: #be9759;
  /* text-shadow: 2px 2px #be9759; */
}
.eventImg {
  width: 100px;
}
.eventContainerChild {
  place-items: center;
  height: 15%;
  margin-top: 15px;
}
.btn {
  place-self: center;
  width: 100px;
}
#desc {
  font-size: 18px;
  margin-top: 30px;
}
#eventInfoCtr {
  height: 35%;
  display: grid;
  row-gap: 5px;
  margin-top: 20px;
}
#eventCtr {
  display: grid;
  height: 75%;
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.5fr 3fr 0.5fr;
}
#eventCtr > h1 {
  align-self: end;
  border-bottom: 1px solid grey;
  font-size: 30px;
  padding-bottom: 5px;
}
.componentCtr {
  height: 70%;
  min-height: 60%;
}
.btnContainer {
  align-self: end;
}
.genGrid {
  height: 40%;
  margin-top: 30px;
}
.genGrid h1 {
  border-bottom: 1px solid grey;
  font-size: 40px;
}
</style>
