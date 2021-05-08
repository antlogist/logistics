const defaultTimeslotsStore = {
  namespaced: true,
  state: {
    timeslots: {
      0: [
        {
          id: "1",
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          id: "1",
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      1: [
        {
          id: "1",
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          id: "1",
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      2: [],
      3: [
        {
          id: "1",
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          id: "1",
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      4: [
        {
          id: "1",
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          id: "1",
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      5: [],
      6: []
    },
    currentWeekday: ""
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots
  },
  actions: {
    setCurrentWeekday({ state }, index) {
      state.currentWeekday = index;
    },
    async fetchTimeslots({ state }) {
      console.log(state);
    },
    async addDefaultTimeslot({ state }) {
      console.log(state);
    }
  }
};

export default defaultTimeslotsStore;
