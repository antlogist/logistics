import calendarApi from "@/services/calendarApi";
import mutations from "@/store/mutations";

const { SHOW_DIALOG, DAY_OFFS } = mutations;

const calendarStore = {
  namespaced: true,
  state: {
    isDayDialogShow: false,
    currentDate: "",
    dayOffs: []
  },
  getters: {
    isDayDialogShow: ({ isDayDialogShow }) => isDayDialogShow,
    currentDate: ({ currentDate }) => currentDate,
    dayOffs: ({ dayOffs }) => dayOffs
  },
  mutations: {
    [SHOW_DIALOG](state, bool) {
      state.isDayDialogShow = bool;
    },
    [DAY_OFFS](state, value) {
      state.dayOffs = value;
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
    async fetchDayoffs({ dispatch, commit }, date) {
      const month = date.substring(0, 7);
      console.log(dispatch, commit, month);
      try {
        const response = await calendarApi.fetchDayoffs(month);
        console.log(response);
        if (response.Error) {
          throw Error(response.Error);
        }
        commit("DAY_OFFS", response["dates"]);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("finally");
      }
    },
    async createDayoff({ dispatch, commit }, date) {
      console.log(dispatch, commit, date);
      //      try {
      //
      //      } catch(err) {
      //        console.log(err);
      //      } finally {
      //
      //      }
    }
  }
};

export default calendarStore;
