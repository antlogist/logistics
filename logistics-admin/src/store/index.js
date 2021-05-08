import Vue from "vue";
import Vuex from "vuex";
import drawer from "./modules/drawer";
import calendar from "./modules/calendar";
import customTimeslots from "./modules/customTimeslots";
import loader from "./modules/loader";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    drawer,
    calendar,
    customTimeslots,
    loader
  }
});
