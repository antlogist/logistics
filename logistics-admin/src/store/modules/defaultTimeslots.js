import defaultTimeslotsApi from "@/services/defaultTimeslotsApi";

function serializeTimeslots(timeslots) {
  let slots = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

  Object.entries(slots).forEach(([key], index) => {
    timeslots.forEach(timeslot => {
      if (timeslot["weekday"] === key) {
        slots[index].push(timeslot);
      }
    });
  });

  return slots;
}

const defaultTimeslotsStore = {
  namespaced: true,
  state: {
    timeslots: {},
    currentWeekday: ""
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots
  },
  actions: {
    setCurrentWeekday({ state }, index) {
      state.currentWeekday = index;
    },
    async addDefaultTimeslot({ state, dispatch }, { timeStartAt, timeEndAt }) {
      const timeslot = {
        weekday: state.currentWeekday,
        start_at: timeStartAt,
        end_at: timeEndAt
      };

      try {
        const response = await defaultTimeslotsApi.createDefaultTimeslot(
          timeslot
        );
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchTimeslots", state.currentDate, { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("addDefaultTimeslot finally");
      }
    },
    async fetchTimeslots({ state }) {
      state.timeslots = [];
      try {
        const response = await defaultTimeslotsApi.fetchDefaultTimeslots();
        if (response.Error) {
          throw Error(response.Error);
        }
        state.timeslots = serializeTimeslots(response["timeslots"]);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("fetchTimeslots finally");
      }
    }
  }
};

export default defaultTimeslotsStore;
