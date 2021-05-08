const defaultTimeslotsStore = {
  namespaced: true,
  state: {
    timeslots: {
      0: [
        {
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      1: [
        {
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      2: [],
      3: [
        {
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
          start_at: "07:30:00",
          end_at: "08:00:00"
        }
      ],
      4: [
        {
          start_at: "07:00:00",
          end_at: "07:30:00"
        },
        {
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
  }
};

export default defaultTimeslotsStore;
