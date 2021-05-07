import timeslotsApi from "@/services/timeslotsApi";

const timeslotsStore = {
  namespaced: true,
  state: {
    timeslots: [
      {
        date: "2021-01-19",
        weekday: "0",
        start_at: "09:00",
        end_at: "09:30"
      },
      {
        date: "2021-01-19",
        weekday: "0",
        start_at: "09:30",
        end_at: "10:00"
      },
      {
        date: "2021-01-19",
        weekday: "0",
        start_at: "10:00",
        end_at: "10:30"
      }
    ],
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
    async addCustomTimeslot({ state }, { timeStartAt, timeEndAt }) {
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
      } catch (err) {
        console.log(err);
      } finally {
        state.timeslots.push(timeslot);
        //        console.log(state);
      }
    }
  }
};

export default timeslotsStore;
