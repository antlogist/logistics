import Vue from "vue";
import Vuex from "vuex";
import loader from "./modules/loader";
import booking from "./modules/booking";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loader,
    booking
  }
});
