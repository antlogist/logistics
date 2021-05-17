import bookingApi from "@/services/bookingApi";
import mutations from "@/store/mutations";

const { DAY_OFFS, SHOW_DIALOG } = mutations;

const bookingStore = {
  namespaced: true,
  state: {
    settings: {},
    timeslots: [],
    dayOffs: [],
    currentWeekday: "",
    currentDate: "",
    isDayDialogShow: false
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots,
    dayOffs: ({ dayOffs }) => dayOffs,
    isDayDialogShow: ({ isDayDialogShow }) => isDayDialogShow,
    currentDate: ({ currentDate }) => currentDate
  },
  mutations: {
    [DAY_OFFS](state, arr) {
      arr.map(({ date }) => {
        state.dayOffs.push(date);
      });
    },
    [SHOW_DIALOG](state, bool) {
      state.isDayDialogShow = bool;
    }
  },
  actions: {
    openDayDialog({ commit, state }, data) {
      console.log("OPEN DAY DIALOG!!!");
      state.currentDate = data.date;
      commit("SHOW_DIALOG", true);
    },
    closeDayDialog({ commit }) {
      commit("SHOW_DIALOG", false);
    },
    setCurrentWeekday({ state }, weekday) {
      state.currentWeekday = weekday;
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
            console.log(state.timeslots);
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
    }
  }
};

export default bookingStore;
