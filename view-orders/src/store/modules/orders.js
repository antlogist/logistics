import mutations from "@/store/mutations";

const { ORDERS } = mutations;

const ordersStore = {
  namespaced: true,
  state: {
    orders: {}
  },
  getters: {
    orders: ({ orders }) => orders
  },
  mutations: {
    [ORDERS](state, orders) {
      state.orders = orders;
    }
  },
  actions: {
    fetchOrders({ commit }, orders) {
      commit("ORDERS", orders);
    }
  }
};

export default ordersStore;
