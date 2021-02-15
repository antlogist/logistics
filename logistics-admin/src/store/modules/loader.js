import mutations from "@/store/mutations";
const { TOGGLE_LOADER, TOGGLE_LOADER_TWO } = mutations;
const loaderStore = {
  state: {
    isShowLoader: false,
    isShowLoaderTwo: false
  },
  getters: {
    isShowLoader: ({ isShowLoader }) => isShowLoader,
    isShowLoaderTwo: ({ isShowLoaderTwo }) => isShowLoaderTwo
  },
  mutations: {
    [TOGGLE_LOADER](state, bool) {
      state.isShowLoader = bool;
    },
    [TOGGLE_LOADER_TWO](state, bool) {
      state.isShowLoaderTwo = bool;
    }
  },
  actions: {
    toggleLoader({ commit }, bool) {
      commit("TOGGLE_LOADER", bool);
    },
    toggleLoaderTwo({ commit }, bool) {
      commit("TOGGLE_LOADER_TWO", bool);
    }
  }
};

export default loaderStore;
