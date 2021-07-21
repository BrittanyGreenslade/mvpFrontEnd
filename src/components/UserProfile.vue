<template>
  <div>
    <h1>{{ currentUserInfo.name }}'s Profile</h1>
    <h5>Birthdate: {{ currentUserInfo.birthdate }}</h5>
    <h5>{{ currentUserInfo.email }}</h5>
    <p>{{ currentUserInfo.bio }}</p>
    <p>{{ currentUserInfo.linkedInUrl }}</p>
    <p>{{ currentUserInfo.cityName }}</p>
    <p>{{ currentUserInfo.countryName }}</p>
    <img
      class="profileImg"
      :src="`${currentUserInfo.imageUrl}`"
      alt="current user profile picture"
    />
    <logout-btn />
    <!-- <past-user-events /> -->
  </div>
</template>

<script>
import axios from "axios";
import LogoutBtn from "./LogoutBtn.vue";
// import PastUserEvents from "../components/PastUserEvents.vue";
export default {
  name: "user-profile",
  components: {
    LogoutBtn,
    // PastUserEvents,
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
.profileImg {
  width: 200px;
}
</style>
