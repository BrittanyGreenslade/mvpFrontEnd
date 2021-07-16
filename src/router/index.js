import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Event from "../views/Event.vue";
import CreateEvent from "../views/CreateEvent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile/:userId",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/event",
    name: "Event",
    component: Event,
  },
  {
    path: "/createEvent",
    name: "Create Event",
    component: CreateEvent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
