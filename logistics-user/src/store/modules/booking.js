import bookingApi from "@/services/bookingApi";
import mutations from "@/store/mutations";
import { tConvert } from "@/helpers/helpers.js";

const { DAY_OFFS, SHOW_DIALOG, SHOW_ORDER_DIALOG } = mutations;

const bookingStore = {
  namespaced: true,
  state: {
    settings: {},
    timeslots: {},
    dayOffs: [],
    currentWeekday: "",
    currentDate: "",
    isDayDialogShow: false,
    isOrderDialogShow: false,
    start_at: "",
    end_at: "",
    email: "",
    phone: "",
    address: "",
    name: "",
    order_id: "",
    order_token: ""
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots,
    dayOffs: ({ dayOffs }) => dayOffs,
    isDayDialogShow: ({ isDayDialogShow }) => isDayDialogShow,
    isOrderDialogShow: ({ isOrderDialogShow }) => isOrderDialogShow,
    currentDate: ({ currentDate }) => currentDate,
    start_at: ({ start_at }) => start_at,
    end_at: ({ end_at }) => end_at,
    email: ({ email }) => email,
    phone: ({ phone }) => phone,
    address: ({ address }) => address,
    name: ({ name }) => name
  },
  mutations: {
    [DAY_OFFS](state, arr) {
      arr.map(({ date }) => {
        state.dayOffs.push(date);
      });
    },
    [SHOW_DIALOG](state, bool) {
      state.isDayDialogShow = bool;
    },
    [SHOW_ORDER_DIALOG](state, bool) {
      state.isOrderDialogShow = bool;
    }
  },
  actions: {
    openDayDialog({ commit, state }, date) {
      state.currentDate = date;

      commit("SHOW_DIALOG", true);
    },
    closeDayDialog({ commit }) {
      commit("SHOW_DIALOG", false);
    },
    openOrderDialog({ commit }) {
      commit("SHOW_ORDER_DIALOG", true);
    },
    closeOrderDialog({ commit }) {
      commit("SHOW_ORDER_DIALOG", false);
    },
    setCurrentWeekday({ state }, weekday) {
      state.currentWeekday = weekday;
    },
    setName({ state }, name) {
      state.name = name;
    },
    setEmail({ state }, email) {
      state.email = email;
    },
    setPhone({ state }, phone) {
      state.phone = phone;
    },
    setAddress({ state }, address) {
      state.address = address;
    },
    setCurrentTimeslot({ state }, { start_at, end_at }) {
      state.start_at = start_at;
      state.end_at = end_at;
    },
    async fetchTimeslots({ state }) {
      state.timeslots = [];
      try {
        await Promise.all([
          bookingApi.fetchTimeslots(),
          bookingApi.fetchSettings()
        ])
          .then(value => {
            state.timeslots = value[0]["timeslots"];
            state.settings = value[1]["data"];
          })
          .catch(error => console.log(`Error in promises ${error}`));
      } catch (err) {
        console.log(err);
      } finally {
        console.log("fetchTimeslots finally");
      }
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
          const response = await bookingApi.fetchDayoffs(month);
          if (response.Error) {
            throw Error(response.Error);
          }
          commit("DAY_OFFS", response["dates"]);
        } else {
          // If interval contains a couple of dates
          for (let i = 0; i < datesArr.length; i++) {
            const day = datesArr[i];
            const month = day.substring(0, 7);
            const response = await bookingApi.fetchDayoffs(month);
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
    async placeOrder({ state, dispatch }) {
      try {
        const response = await bookingApi.placeOrder({
          name: state.name,
          email: state.email,
          date: state.currentDate,
          timeslot: `${tConvert(state.start_at)}-${tConvert(state.end_at)}`,
          phone: state.phone,
          address: state.address,
          order_id: state.order_id,
          order_token: state.order_token,
          start_at: state.start_at,
          end_at: state.end_at
        });
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("makePayment");
      } catch (err) {
        console.log(err);
      } finally {
        console.log("finally placeOrder");
      }
    },

    async makePayment() {
      try {
        const response = await bookingApi.makePayment(orderToken);
        if (response.Error) {
          throw Error(response.Error);
        }
        if (response === "false") {
          alert("Something Went Wrong");
        } else {
          window.location.href = response;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkOrderToken({ dispatch }, focus) {
      dispatch("toggleLoader", true, { root: true });
      try {
        const response = await bookingApi.checkOrderToken(
          orderToken,
          focus,
          focus
        );
        if (response.Error) {
          throw Error(response.Error);
        }
        if (response === true) window.location.href = "/order-duplication.php";
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },

    onMounted({ state, dispatch }, focus) {
      dispatch("checkOrderToken", focus, { root: false });
      state.name = profileName;
      state.email = profileEmail;
      state.phone = profilePhone;
      state.address = profileAddress;
      state.order_id = orderId;
      state.order_token = orderToken;
    }
  }
};

export default bookingStore;
