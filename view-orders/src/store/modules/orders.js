import ordersApi from "@/services/ordersApi";
import mutations from "@/store/mutations";

function serializeOrders(orders) {
  return orders.reduce((acc, order) => {
    let { id, created_at, total_price, payment_status, order_token } = order;
    return [
      ...acc,
      {
        id: id,
        createdAt: created_at,
        totalPrice: total_price,
        paymentStatus: payment_status,
        orderToken: order_token,
        deliveryDate: "",
        deliveryTimeslot: "",
        deliveryStatus: ""
      }
    ];
  }, []);
}

const { ORDERS } = mutations;

const ordersStore = {
  namespaced: true,
  state: {
    orders: []
  },
  getters: {
    orders: ({ orders }) => orders
  },
  mutations: {
    [ORDERS](state, orders) {
      state.orders = orders.length > 0 ? serializeOrders(orders) : orders;
    }
  },
  actions: {
    fetchOrders({ commit }, orders) {
      commit("ORDERS", orders);
    },
    async fetchDelivery({ state }, orders) {
      state.delivery = [];
      for (const order of orders) {
        if (order.orderToken) {
          try {
            const response = await ordersApi.fetchDelivery(
              order.createdAt.substring(0, 10),
              order.orderToken
            );
            // Add delivery info to the object
            for (var i = 0; i < state.orders.length; i++) {
              if (response.orderToken === state.orders[i].orderToken) {
                state.orders[i].deliveryDate = response.date;
                state.orders[i].deliveryTimeslot = response.timeslot;
                break;
              }
            }
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
