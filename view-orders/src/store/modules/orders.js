import ordersApi from "@/services/ordersApi";
import mutations from "@/store/mutations";

const { ORDERS } = mutations;

const ordersStore = {
  namespaced: true,
  state: {
    orders: [],
    delivery: []
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
    },
    async fetchDelivery({ state }, orders) {
      state.delivery = [];
      for (const order of orders) {
        if (order.order_token) {
          try {
            const response = await ordersApi.fetchDelivery(
              order.created_at.substring(0, 10),
              order.order_token
            );
            state.delivery.push(response);
          } catch (err) {
            console.log(err);
          }
        }
      }
      console.log(state);
    }
  }
};

export default ordersStore;
