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
      orderToken
    } = order;
    return [
      ...acc,
      {
        id: id,
        name: name,
        start: date,
        end: date,
        color: "transparent",
        nameColor: "transparent",
        timed: 0,
        timeslot: timeslot,
        address: address,
        email: email,
        phone: phone,
        status: status,
        orderId: orderId,
        orderToken: orderToken,
        paymentStatus: ""
      }
    ];
  }, []);
}

const {
  SHOW_DIALOG,
  DAY_OFFS,
  ORDERS,
  ORDERS_INFO,
  PAYMENT_STATUS
} = mutations;

const calendarStore = {
  namespaced: true,
  state: {
    isDayDialogShow: false,
    currentDate: "",
    currentDateId: "",
    dayOffs: [],
    orders: [],
    ordersInfo: [],
    paymentFilterValue: "paid"
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
    [ORDERS_INFO](state, { order_token, payment_status }) {
      state.ordersInfo.push({ order_token, payment_status });
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
      console.log(state.isDayDialogShow, data);
      state.currentDate = data.date;
      commit("SHOW_DIALOG", true);
    },
    closeDayDialog({ commit, state }) {
      console.log(state.isDayDialogShow);
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
        dispatch("toggleLoaderTwo", false, { root: true });
        dispatch("fetchOrdersInfo", "", { root: false });
      }
    },
    async fetchOrdersInfo({ state, commit, dispatch }) {
      dispatch("toggleLoaderTwo", true, { root: true });
      try {
        state.ordersInfo = [];
        const orders = state.orders;
        for (let i = 0; i < orders.length; i++) {
          const token = orders[i]["orderToken"];
          const response = token
            ? await calendarApi.fetchOrdersInfo(token)
            : "";
          if (response.Error) {
            throw Error(response.Error);
          }
          if (token) {
            commit("ORDERS_INFO", response);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoaderTwo", false, { root: true });
        commit("PAYMENT_STATUS");
        dispatch("setPaymentFilterColor", "", { root: false });
      }
    },
    setPaymentFilter({ state, dispatch }, { value }) {
      state.paymentFilterValue = value;
      dispatch("setPaymentFilterColor", "", { root: false });
    },
    setPaymentFilterColor({ state }) {
      const filterName = state.paymentFilterValue;

      if (filterName !== "paid") {
        state.orders.map((item, i) => {
          if (state.orders[i].paymentStatus !== "paid") {
            state.orders[i].color = "#9fc51c";
            state.orders[i].nameColor = "#000000";
          } else {
            state.orders[i].color = "transparent";
            state.orders[i].nameColor = "gray";
          }
        });
      } else {
        state.orders.map((item, i) => {
          if (state.orders[i].paymentStatus === "paid") {
            state.orders[i].color = "#9fc51c";
            state.orders[i].nameColor = "#000000";
          } else {
            state.orders[i].color = "transparent";
            state.orders[i].nameColor = "gray";
          }
        });
      }
    }
  }
};

export default calendarStore;
