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
      if (state.allEvents == undefined) {
        let events = [];
        events.push(data);
        state.allEvents = events;
      } else {
        state.allEvents.push(data);
      }
    },
    deleteUser(state) {
      for (let i = 0; i < state.allUsers.length; i++) {
        if (state.allUsers[i].userId === this.currentUserInfo.userId) {
          state.allUsers.splice(i, 1);
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
          context.commit("updateUsersEvents", res.data);
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
