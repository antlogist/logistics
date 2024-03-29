import Vue from "vue";
import Vuex from "vuex";
import orders from "./modules/orders";
import loader from "./modules/loader";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    orders,
    loader
  }
});
