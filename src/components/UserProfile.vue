<template>
  <div>
    <div class="genGrid">
      <div id="navCtr">
        <router-link id="xBtn" to="/home"
          ><img
            class="actionIcon"
            src="../assets/close.svg"
            alt="close user profile"
        /></router-link>
        <router-link
          v-if="Number(userId) === currentUserInfo.userId"
          id="editIcon"
          to="/editProfile"
          ><img
            class="actionIcon"
            src="../assets/pen.png"
            alt="edit user profile"
        /></router-link>
      </div>
      <div id="userInfoCtr">
        <img
          class="profileImg"
          :src="`${userInfo.imageUrl}`"
          alt="user profile picture"
        />
        <h1>{{ userInfo.name }}</h1>
        <p id="location">{{ userInfo.cityName }}, {{ userInfo.countryName }}</p>
        <h4>{{ userInfo.email }}</h4>
        <a id="linkedIn" :href="`${userInfo.linkedInUrl}`">{{
          userInfo.linkedInUrl
        }}</a>
        <logout-btn
          v-if="Number(userId) === currentUserInfo.userId"
          id="logoutBtn"
        />
      </div>
      <div id="eventsTimeToggle">
        <h3 id="going" @click="futureEventsViewOn">Going</h3>
        <h3 id="past" @click="pastEventsViewOn">Past</h3>
      </div>
      <future-user-events v-if="pastEventsView === false" />
      <past-user-events v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LogoutBtn from "./LogoutBtn.vue";
import FutureUserEvents from "../components/FutureUserEvents.vue";
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
      userInfo: {},
    };
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  watch: {
    userId(newValue, oldValue) {
      this.viewUserProfile(Number(newValue));
      newValue, oldValue;
      //this is for if the route changes, since the dom doesn't re-render the data wasn't loading
      this.$store.dispatch("getUsersEvents", Number(newValue));
    },
  },
  mounted() {
    //need this for when currentUser updates their profile and it doesn't do a
    //call to get user info.
    this.checkUser();
    document.getElementById("going").style.color = "#FFFF00";
    //will change value of getters once this is dispatched
    // if (this.usersEvents === undefined) {
    this.$store.dispatch("getUsersEvents", Number(this.userId));
    // }
    if (this.allUsers === undefined) {
      this.viewUserProfile(Number(this.userId));
    } else {
      this.oneUser();
    }
  },
  methods: {
    //need this for when currentUser updates their profile and it doesn't do a
    //call to get user info.
    checkUser() {
      if (Number(this.userId) === this.currentUserInfo.userId) {
        this.userInfo = this.currentUserInfo;
      }
    },
    oneUser() {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (Number(this.allUsers[i].userId) === Number(this.userId)) {
          this.user = this.allUsers[i];
          return;
          //anything after this won't happen if event is found
        }
      }
      this.viewUserProfile(Number(this.userId));
    },
    futureEventsViewOn() {
      if (this.pastEventsView === true) {
        this.pastEventsView = false;
      }
      document.getElementById("going").style.color = "#FFFF00";
      document.getElementById("past").style.color = "#05b0c7";
    },
    pastEventsViewOn() {
      if (this.pastEventsView === false) {
        this.pastEventsView = true;
      }
      document.getElementById("going").style.color = "#05b0c7";
      document.getElementById("past").style.color = "#FFFF00";
    },
    viewUserProfile(userId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: userId,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.userInfo = res.data[i];
          }
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
#linkedIn {
  font-weight: normal;
  font-size: 14px;
  word-wrap: break-word;
  text-align: center;
}
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
  margin-top: 20px;
  place-self: center;
  display: grid;
  width: 100%;
  place-items: center;
  margin-bottom: 30px;
  row-gap: 2px;
}
#userInfoCtr h4 {
  margin-bottom: 5px;
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
/* for the going/past events headers */
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
  width: 24px;
}
#xBtn {
  width: 20px;
}
</style>
