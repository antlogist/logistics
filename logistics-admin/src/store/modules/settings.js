import settingsApi from "@/services/settingsApi";

const settingsStore = {
  namespaced: true,
  state: {
    settings: {}
  },
  getters: {
    settings: ({ settings }) => settings
  },
  mutations: {},
  actions: {
    async fetchSettings({ state }) {
      state.settings = {};
      try {
        const response = await settingsApi.fetchSettings();
        if (response.Error) {
          throw Error(response.Error);
        }
        state.settings = response["data"];
      } catch (err) {
        console.log(err);
      } finally {
        console.log("fetchSettings finally");
      }
    },
    async updateSettings({ dispatch }, { name, value }) {
      const setting = { name, value };

      try {
        const response = await settingsApi.updateSettings(setting);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch("fetchSettings", "", { root: false });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("updateSettings finally");
      }
    }
  }
};

export default settingsStore;
