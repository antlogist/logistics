import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/components/calendar/Calendar";
import Orders from "@/components/orders/Orders";

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
        path: "/orders",
        name: "Orders",
        component: Orders
      },
    ]
  });
}
