import ordersApi from "@/services/ordersApi";
import mutations from "@/store/mutations";

function serializeOrders(orders) {
  return orders.reduce((acc, order) => {
    let { id, created_at, total_price, status, order_token } = order;
    return [
      ...acc,
      {
        id: id,
        createdAt: created_at,
        totalPrice: total_price,
        status: status,
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
    fetchOrders({ commit, dispatch }, orders) {
      dispatch("toggleLoader", true, { root: true });
      commit("ORDERS", orders);
      dispatch("toggleLoader", false, { root: true });
    },
    async fetchDelivery({ state, dispatch }, orders) {
      dispatch("toggleLoader", true, { root: true });
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
            console.log({ orders: err });
          }
        }
      }
      dispatch("toggleLoader", false, { root: true });
    },
    async makePayment({ dispatch }, token) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await ordersApi.makePayment(token);
        if (response === "false") {
          alert("Something Went Wrong");
        } else {
          console.log({ response });
          window.location.href = response;
        }
      } catch (err) {
        console.log(err);
      }

      dispatch("toggleLoader", false, { root: true });
    },
    async cancelOrder({ state, dispatch }, token) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await ordersApi.cancelOrder(token);
        if (response === "false") {
          alert("Something Went Wrong");
        } else {
          console.log({ response });
          for (var i = 0; i < state.orders.length; i++) {
            if (token === state.orders[i].orderToken) {
              state.orders[i].status = "canceled";
              break;
            }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }

      
    }
  }
};

export default ordersStore;
