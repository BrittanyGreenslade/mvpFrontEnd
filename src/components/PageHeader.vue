<template>
  <div id="headerCtr" v-if="loginToken">
    <router-link id="homeLink" to="/home">
      <img
        id="headerImg"
        src="../assets/websiteNameLogoHeader.jpg"
        alt="web developmeet in vs code styling"
      />
    </router-link>
    <router-link :to="`/profile/${currentUserInfo.userId}`"
      ><img
        class="profileImg"
        :src="`${currentUserInfo.imageUrl}`"
        alt="current user profile picture"
    /></router-link>
  </div>
</template>

<script>
export default {
  name: "page-header",
  components: {},

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
};
</script>

<style scoped>
#headerCtr {
  grid-template-columns: 4fr 1fr;
  place-items: center;
  margin-top: 10px;
  border-bottom: 1px solid grey;
  height: 12vh;
  align-self: start;
}
.profileImg {
  border-radius: 50px;
  width: 40px;
}
#homeLink {
  display: grid;
  justify-self: end;
  min-width: 80%;
}
#headerImg {
  height: 90%;
}
</style>
