import timeslotsApi from "@/services/timeslotsApi";

const timeslotsStore = {
  namespaced: true,
  state: {
    timeslots: [],
    currentWeekday: "",
    currentDate: ""
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots
  },
  mutations: {},
  actions: {
    setCurrentWeekday({ state }, weekday) {
      state.currentWeekday = weekday;
    },
    setCurrentDate({ state }, currentDate) {
      state.currentDate = currentDate;
    },
    async addCustomTimeslot({ state, dispatch }, { timeStartAt, timeEndAt }) {
      const timeslot = {
        date: state.currentDate,
        weekday: state.currentWeekday,
        start_at: timeStartAt,
        end_at: timeEndAt
      };

      try {
        const response = await timeslotsApi.createCustomTimeslot(timeslot);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchTimeslots", state.currentDate, { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("addCustomTimeslot finally");
      }
    },
    async fetchTimeslots({ state }, date) {
      state.timeslots = [];
      try {
        const response = await timeslotsApi.fetchCustomTimeslots(date);
        if (response.Error) {
          throw Error(response.Error);
        }
        state.timeslots = response["timeslots"];
      } catch (err) {
        console.log(err);
      } finally {
        console.log("fetchTimeslots finally");
      }
    },
    async deleteTimeslots({ state, dispatch }, id) {
      try {
        const response = await timeslotsApi.deleteTimeslots(id);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchTimeslots", state.currentDate, { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("deleteTimeslots finally");
      }
    }
  }
};

export default timeslotsStore;
