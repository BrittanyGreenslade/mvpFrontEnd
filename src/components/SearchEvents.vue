<template>
  <div>
    <form action="javascript:void(0)">
      <input
        type="text"
        placeholder="search event name"
        required
        id="eventSearch"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "search-events",
  computed: {
    allEvents() {
      return this.$store.state.allEvents;
    },
  },
};
</script>

<style scoped></style>
