import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/components/calendar/Calendar";
import Bookings from "@/components/bookings/Bookings";
import Report from "@/components/report/Report";
import Map from "@/components/map/Map";
import Timeslots from "@/components/timeslots/Timeslots";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "hash",
    routes: [
      {
        path: "/",
        name: "Home",
        component: Calendar
      },
      {
        path: "/calendar",
        name: "Calendar",
        component: Calendar
      },
      {
        path: "/bookings",
        name: "Bookings",
        component: Bookings
      },
      {
        path: "/report",
        name: "Report",
        component: Report
      },
      {
        path: "/map",
        name: "Map",
        component: Map
      },
      {
        path: "/timeslots",
        name: "Timeslots",
        component: Timeslots
      }
    ]
  });
}
