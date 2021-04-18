import Vue from "vue";
import Router from "vue-router";
import Orders from "@/components/orders/Orders";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "hash",
    routes: [
      {
        path: "/",
        name: "Home",
        component: Orders
      }
    ]
  });
}
