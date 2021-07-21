<template>
  <div id="headerCtr" v-if="loginToken">
    <h1>COOL APP NAME</h1>
    <!-- <router-link to="/home">Home</router-link> | -->

    <router-link :to="`/profile/${currentUserInfo.userId}`"
      ><img
        class="profileImg"
        :src="`${currentUserInfo.imageUrl}`"
        alt="current user profile picture"
    /></router-link>
    <!-- <logout-btn /> -->
  </div>
</template>

<script>
// import LogoutBtn from "../components/LogoutBtn.vue";
export default {
  name: "page-header",
  components: {
    // LogoutBtn,
  },
  mounted() {
    console.log(this.currentUserInfo.imageUrl);
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
  display: grid;
  grid-template-columns: 4fr 1fr;
  place-items: center;
  margin-top: 10px;
}
.profileImg {
  border-radius: 50px;
  width: 40px;
  /* place-self: end; */
}
</style>
