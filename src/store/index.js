import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUserInfo: cookies.get("currentUserInfo"),
    loginToken: cookies.get("loginToken"),
    allUsers: undefined,
    allEvents: undefined,
    usersEvents: undefined,
    eventsNearLocation: undefined,
    eventsAttendees: undefined,
  },
  mutations: {
    updateCurrentUserInfo(state, data) {
      state.currentUserInfo = data;
    },
    updateLoginToken(state, data) {
      state.loginToken = data;
    },
    updateUsersEvents(state, data) {
      state.usersEvents = data;
    },
    updateUsers(state, data) {
      state.allUsers = data;
    },
    updateAllEvents(state, data) {
      state.allEvents = data;
    },
    addUserEvent(state, data) {
      if (state.usersEvents === undefined) {
        let events = [];
        events.push(data);
        state.usersEvents = events;
      } else {
        state.usersEvents.push(data);
      }
    },
    deleteUser(state, data) {
      state.allUsers.splice(data, 1);
    },
    deleteEvent(state, data) {
      state.allEvents.splice(data, 1);
    },
    deleteUserEvent(state, data) {
      state.usersEvents.splice(data, 1);
    },
    eventsNearLocationUndef(state, data) {
      state.eventsNearLocation = data;
    },

    updateEventsNearLocation(state, data) {
      if (state.eventsNearLocation === undefined) {
        let events = [];
        events.push(data);
        console.log(events);
        console.log(data);
        for (let i = 0; i < events.length; i++) {
          console.log(events.length);
          //   if (Number(events[i].eventId) === Number(data.eventId)) {
          //     console.log(events[i]);
          //     events.splice(i, 1);
          console.log(events[i]);
          continue;
          //     continue;
        }
        // }
        state.eventsNearLocation = events;
        // console.log(events);
      } else {
        for (let i = 0; i < state.eventsNearLocation.length; i++) {
          if (state.eventsNearLocation[i].eventId !== Number(data.eventId)) {
            state.eventsNearLocation.push(data);
            continue;
          }
        }
      }
    },
    createEvent(state, data) {
      if (state.usersEvents == undefined) {
        let events = [];
        events.push(data);
        state.usersEvents = events;
      } else {
        state.usersEvents.push(data);
      }
    },
  },
  actions: {
    getUsers(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          context.commit("updateUsers", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllEvents(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          context.commit("updateAllEvents", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEventsAtLocation(context, cityId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/events/location`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            locationId: cityId,
          },
        })
        .then((res) => {
          console.log(res.data);
          let event = {};
          if (res.data.length >= 0) {
            for (let i = 0; i < res.data.length; i++) {
              event = res.data[i];
            }
            context.commit("updateEventsNearLocation", event);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUsersEvents(context, userId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users-events`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            userId: userId,
          },
        })
        .then((res) => {
          context.commit("updateUsersEvents", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    usersFutureEvents(state) {
      let futureEvents = [];
      if (state.usersEvents === undefined) {
        return futureEvents;
      }
      for (let i = 0; i < state.usersEvents.length; i++) {
        if (Date.parse(state.usersEvents[i].dateTime) > Date.now()) {
          futureEvents.push(state.usersEvents[i]);
        }
      }
      return futureEvents;
    },
    usersPastEvents(state) {
      let pastEvents = [];
      if (state.usersEvents === undefined) {
        return pastEvents;
      }
      //put <= because if they're already attending, I think of it as a past event
      for (let i = 0; i < state.usersEvents.length; i++) {
        if (Date.parse(state.usersEvents[i].dateTime) <= Date.now()) {
          pastEvents.push(state.usersEvents[i]);
        }
      }
      return pastEvents;
    },
  },
});
