import mutations from "@/store/mutations";
const { SHOW_DIALOG } = mutations;

const calendarStore = {
  namespaced: true,
  state: {
    isDayDialogShow: false,
    currentDate: ""
  },
  getters: {
    isDayDialogShow: ({ isDayDialogShow }) => isDayDialogShow,
    currentDate: ({ currentDate }) => currentDate
  },
  mutations: {
    [SHOW_DIALOG](state, bool) {
      state.isDayDialogShow = bool;
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
    }
  }
};

export default calendarStore;
