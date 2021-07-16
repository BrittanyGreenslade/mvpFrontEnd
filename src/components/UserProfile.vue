<template>
  <div>
    <h1>Your Profile</h1>
    <h2>{{ currentUserInfo.username }}</h2>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-profile",
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  mounted() {
    // if(this.proppedUserId !== this.currentUserInfo.userId){}
    // this.viewUserProfile();
  },
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
