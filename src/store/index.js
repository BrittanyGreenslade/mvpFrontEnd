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
    // allEvents: undefined,
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
  },
  actions: {
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
  modules: {},
  getters: {
    usersFutureEvents(state) {
      let futureEvents = [];
      //why does this work? why wouldn't this just make usersFutureEvents an empty array?
      //I don't get how state.usersEvents suddenly becomes defined and two of line 53 print
      console.log(state.usersEvents);
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
  },
});
