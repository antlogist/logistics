import calendarApi from "@/services/calendarApi";
import mutations from "@/store/mutations";

function serializeOrders(orders) {
  return orders.reduce((acc, order) => {
    let {
      id,
      name,
      date,
      timeslot,
      address,
      email,
      phone,
      status,
      orderId,
      orderToken,
      paymentStatus
    } = order;
    return [
      ...acc,
      {
        id: id,
        name: name,
        start: date,
        end: date,
        color: "transparent",
        nameColor: "gray",
        timed: 0,
        timeslot: timeslot,
        address: address,
        email: email,
        phone: phone,
        status: status ? status : "pending",
        orderId: orderId,
        orderToken: orderToken ? orderToken : null,
        paymentStatus: paymentStatus ? paymentStatus : "Unpaid",
        startDate: "",
        endDate: ""
      }
    ];
  }, []);
}

const { SHOW_DIALOG, DAY_OFFS, ORDERS, PAYMENT_STATUS } = mutations;

const calendarStore = {
  namespaced: true,

  state: {
    isDayDialogShow: false,
    currentDate: "",
    currentDateId: "",
    dayOffs: [],
    orders: [],
    ordersInfo: [],
    paymentFilterValue: "Paid"
  },

  getters: {
    isDayDialogShow: ({ isDayDialogShow }) => isDayDialogShow,
    currentDate: ({ currentDate }) => currentDate,
    currentDateId: ({ currentDateId }) => currentDateId,
    dayOffs: ({ dayOffs }) => dayOffs,
    orders: ({ orders }) => orders,
    ordersInfo: ({ ordersInfo }) => ordersInfo,
    paymentFilterValue: ({ paymentFilterValue }) => paymentFilterValue
  },

  mutations: {
    [SHOW_DIALOG](state, bool) {
      state.isDayDialogShow = bool;
    },
    [DAY_OFFS](state, arr) {
      arr.map(({ date }) => {
        state.dayOffs.push(date);
      });
    },
    [ORDERS](state, orders) {
      state.orders = orders;
    },
    [PAYMENT_STATUS](state) {
      const ordersInfo = state.ordersInfo;
      state.orders.map((order, i) => {
        for (let k = 0; k < ordersInfo.length; k++) {
          if (state.ordersInfo[k].order_token === order.orderToken) {
            state.orders[i].paymentStatus = state.ordersInfo[k].payment_status;
            break;
          }
        }
        if (state.orders[i].paymentStatus === "") {
          state.orders[i].paymentStatus = "undefined";
        }
      });
    }
  },

  actions: {
    openDayDialog({ commit, state }, data) {
      state.currentDate = data.date;
      commit("SHOW_DIALOG", true);
    },
    closeDayDialog({ commit }) {
      commit("SHOW_DIALOG", false);
    },
    async fetchDayoffs({ state, commit, dispatch }, datesArr) {
      dispatch("toggleLoader", true, { root: true });
      // Clean dayOffs state
      state.dayOffs = [];
      try {
        if (datesArr.length === 1) {
          // If interval contains one date
          const day = datesArr[0];
          const month = day.substring(0, 7);
          const response = await calendarApi.fetchDayoffs(month);
          if (response.Error) {
            throw Error(response.Error);
          }
          commit("DAY_OFFS", response["dates"]);
        } else {
          // If interval contains a couple of dates
          for (let i = 0; i < datesArr.length; i++) {
            const day = datesArr[i];
            const month = day.substring(0, 7);
            const response = await calendarApi.fetchDayoffs(month);
            if (response.Error) {
              throw Error(response.Error);
            }
            commit("DAY_OFFS", response["dates"]);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    async createDayoff({ state, dispatch }, date) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await calendarApi.createDayoff(date);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchDayoffs", [state.currentDate], { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    async deleteDayoff({ state, dispatch }, id) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await calendarApi.deleteDayoff(id);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchDayoffs", [state.currentDate], { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    async fetchOrders({ state, commit, dispatch }, { startDate, endDate }) {
      dispatch("toggleLoaderTwo", true, { root: true });
      state.orders = [];
      state.startDate = startDate;
      state.endDate = endDate;
      try {
        const response = await calendarApi.fetchOrders(startDate, endDate);
        if (response.Error) {
          throw Error(response.Error);
        }
        const orders = serializeOrders(response["orders"]);

        commit("ORDERS", orders);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("setPaymentFilterColor", "", { root: false });
        dispatch("toggleLoaderTwo", false, { root: true });
      }
    },

    async fetchOrderInfo({ dispatch }, { orderToken }) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = orderToken
          ? await calendarApi.fetchOrdersInfo(orderToken)
          : "";
        if (response.Error) {
          throw Error(response.Error);
        }
        if (response.payment_status === "Paid") {
          dispatch("setPaymentStatus", { orderToken }, { root: false });
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },

    async fetchOrdersInfo({ dispatch, state }) {
      dispatch("toggleLoaderTwo", true, { root: true });

      for (const item of state.orders) {
        const orderToken = item.orderToken;
        if (item.paymentStatus === "Unpaid" && orderToken !== null) {
          try {
            const response = await calendarApi.fetchOrdersInfo(item.orderToken);
            if (response !== null) {
              if (response.Error) {
                throw Error(response.Error);
              }
              if (response.payment_status === "Paid") {
                dispatch("setPaymentStatus", { orderToken }, { root: false });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
      dispatch("toggleLoaderTwo", false, { root: true });
    },

    async setPaymentStatus({ state, dispatch }, { orderToken }) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await calendarApi.updatePaymentStatus(orderToken);
        if (response.Error) {
          throw Error(response.Error);
        }

        state.orders.map((order, index) => {
          if (order.orderToken === orderToken) {
            state.orders[index].paymentStatus = "Paid";
          }
        });

        dispatch("setPaymentFilterColor", "", { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },

    setPaymentFilter({ state, dispatch }, { value }) {
      state.paymentFilterValue = value;
      dispatch("setPaymentFilterColor", "", { root: false });
    },
    setPaymentFilterColor({ state }) {
      const filterName = state.paymentFilterValue;

      if (filterName !== "Paid") {
        state.orders.map((item, i) => {
          if (state.orders[i].paymentStatus !== "Paid") {
            state.orders[i].color = "#9fc51c";
            state.orders[i].nameColor = "#000000";
          } else {
            state.orders[i].color = "transparent";
            state.orders[i].nameColor = "gray";
          }
        });
      } else {
        state.orders.map((item, i) => {
          if (state.orders[i].paymentStatus === "Paid") {
            state.orders[i].color = "#9fc51c";
            state.orders[i].nameColor = "#000000";
          } else {
            state.orders[i].paymentStatus = "Unpaid";
            state.orders[i].color = "transparent";
            state.orders[i].nameColor = "gray";
          }
        });
      }
    },
    async updateOrderStatus({ state, dispatch }, { id, status }) {
      dispatch("toggleLoaderTwo", true, { root: true });
      try {
        const response = await calendarApi.updateOrderStatus(id, status);
        if (response.Error) {
          throw Error(response.Error);
        }
        const arr = state.orders;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) {
            state.orders[i]["status"] =
              state.orders[i]["status"] === "pending" ? "done" : "pending";
            break;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoaderTwo", false, { root: true });
      }
    }
  }
};

export default calendarStore;
