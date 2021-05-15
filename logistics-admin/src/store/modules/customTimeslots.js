import customTimeslotsApi from "@/services/customTimeslotsApi";

const customTimeslotsStore = {
  namespaced: true,
  state: {
    timeslots: [],
    currentWeekday: "",
    currentDate: ""
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots,
    currentWeekday: ({ currentWeekday }) => currentWeekday
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
        const response = await customTimeslotsApi.createCustomTimeslot(
          timeslot
        );
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
        const response = await customTimeslotsApi.fetchCustomTimeslots(date);
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
    async deleteTimeslot({ state, dispatch }, id) {
      try {
        const response = await customTimeslotsApi.deleteTimeslot(id);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchTimeslots", state.currentDate, { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("deleteTimeslot finally");
      }
    },
    async updateCustomTimeslot(
      { dispatch, state },
      { id, timeStartAt, timeEndAt }
    ) {
      const timeslot = {
        id: id,
        start_at: timeStartAt,
        end_at: timeEndAt
      };

      try {
        const response = await customTimeslotsApi.updateTimeslot(timeslot);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchTimeslots", state.currentDate, { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("updateCustomTimeslot finally");
      }
    }
  }
};

export default customTimeslotsStore;
