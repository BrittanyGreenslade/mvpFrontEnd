<template>
  <div id="headerCtr" v-if="loginToken">
    <router-link to="/home"><h1>COOL APP NAME</h1></router-link>
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
  components: {
    // LogoutBtn,
  },

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
  height: 10vh;
  align-self: start;
}
.profileImg {
  border-radius: 50px;
  width: 40px;
}
</style>
