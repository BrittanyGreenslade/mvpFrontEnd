<template>
  <div id="usersEventsCtr">
    <div class="eventContainerParent">
      <h3 class="notifyNoEvents" v-if="usersPastEvents.length === 0">
        This user has not attended any events
      </h3>
      <div
        class="eventContainer"
        v-for="event in usersPastEvents"
        :key="event.eventId"
      >
        <div class="eventContainerChild">
          <div class="genGrid">
            <p>{{ event.dateTime }} (UTC)</p>
            <router-link :to="`/event/${event.eventId}`">
              <h3 class="eventName">{{ event.eventName }}</h3></router-link
            >
            <p>
              Host:
              <router-link class="hostLink" :to="`/profile/${event.hostId}`">{{
                event.hostName
              }}</router-link>
            </p>
            <p class="locationName">
              {{ event.cityName }}, {{ event.countryName }}
            </p>
          </div>
          <img :src="`${event.eventImageUrl}`" alt="event image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "past-user-events",
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    usersPastEvents() {
      return this.$store.getters.usersPastEvents;
    },
    usersEvents() {
      return this.$store.state.usersEvents;
    },
  },
  mounted() {
    if (this.usersEvents === undefined) {
      this.$store.dispatch("getUsersEvents", Number(this.userId));
    }
  },
};
</script>

<style scoped>
#usersEventsCtr {
  min-height: 60vh;
}
.eventContainerParent {
  min-height: 20%;
}
.eventContainer {
  width: 90%;
}
</style>
