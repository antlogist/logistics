import Vue from "vue";
import Vuex from "vuex";
import drawer from "./modules/drawer";
import calendar from "./modules/calendar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    drawer,
    calendar
  }
});
