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
    ]
  },
  getters: {
    timeslots: ({ timeslots }) => timeslots
  },
  mutations: {},
  actions: {}
};

export default timeslotsStore;
