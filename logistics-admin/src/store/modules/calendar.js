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
    [DAY_OFFS](state, arr) {
      arr.map(({ date }) => {
        state.dayOffs.push(date);
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
      //      const month = date.substring(0, 7);
      try {
        if (datesArr.length === 1) {
          // If interval contains one date
          const day = datesArr[0];
          const month = day.substring(0, 7);
          const response = await calendarApi.fetchDayoffs(month);
          console.log(response);
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
            console.log(response);
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
