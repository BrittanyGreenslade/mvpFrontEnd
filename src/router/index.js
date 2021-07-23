import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Event from "../views/Event.vue";
import CreateEvent from "../views/CreateEvent.vue";
import EditProfile from "../views/EditProfile.vue";
import EditEvent from "../views/EditEvent.vue";

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
    path: "/event/:eventId",
    name: "Event",
    component: Event,
  },
  {
    path: "/editEvent",
    name: "Edit Event",
    component: EditEvent,
  },
  {
    path: "/createEvent",
    name: "Create Event",
    component: CreateEvent,
  },
  {
    path: "/editProfile",
    name: "Edit Profile",
    component: EditProfile,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
