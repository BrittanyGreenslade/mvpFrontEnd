<template>
  <div>
    <div class="genGrid">
      <div id="navCtr">
        <router-link to="/home"
          ><img
            class="actionIcon"
            src="../assets/close.svg"
            alt="close user profile"
        /></router-link>
        <router-link id="editIcon" to="/editProfile"
          ><img
            class="actionIcon"
            src="../assets/pen.png"
            alt="edit user profile"
        /></router-link>
      </div>
      <div id="userInfoCtr">
        <!-- add other user's profile to this page too -->
        <img
          class="profileImg"
          :src="`${currentUserInfo.imageUrl}`"
          alt="user profile picture"
        />
        <h1>{{ currentUserInfo.name }}</h1>
        <p id="location">
          {{ currentUserInfo.cityName }}, {{ currentUserInfo.countryName }}
        </p>
        <h4>{{ currentUserInfo.email }}</h4>
        <p>{{ currentUserInfo.linkedInUrl }}</p>
        <logout-btn id="logoutBtn" />
      </div>

      <!-- <h5>Birthdate: {{ currentUserInfo.birthdate }}</h5> -->

      <!-- <h1 id="eventsTitle">Events</h1> -->
      <div id="eventsTimeToggle">
        <h3 @click="pastEventsView = false">Going</h3>
        <h3 @click="pastEventsView = true">Past</h3>
      </div>
      <future-user-events v-if="pastEventsView === false" />
      <past-user-events v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LogoutBtn from "./LogoutBtn.vue";
import FutureUserEvents from "./FutureUserEvents.vue";
import PastUserEvents from "../components/PastUserEvents.vue";
export default {
  name: "user-profile",
  components: {
    LogoutBtn,
    FutureUserEvents,
    PastUserEvents,
  },
  data() {
    return {
      pastEventsView: false,
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  // mounted() {
  //   if (this.usersEvents === undefined) {
  //     this.$store.dispatch("getUsersEvents", this.userId);
  //   }
  // },
  methods: {
    viewUserProfile() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: this.currentUserInfo.userId,
          },
        })
        .then((res) => {
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#eventsTitle {
  margin-left: 20px;
  font-size: 30px;
}
#logoutBtn {
  width: 200px;
  margin-top: 3px;
}
.profileImg {
  width: 100px;
  border-radius: 50%;
}
#userInfoCtr {
  place-self: center;
  display: grid;
  place-items: center;
  margin-bottom: 30px;
  row-gap: 2px;
}
#eventsTimeToggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  place-self: center;
}
#location {
  font-size: 14px;
  font-style: italic;
}
h3 {
  display: grid;
  place-items: center;
  width: 100%;
}
h1 {
  font-size: 35px;
}
#navCtr {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
}
#editIcon {
  justify-self: end;
  width: 50px;
}
#editIcon > img {
  width: 25px;
}
</style>
