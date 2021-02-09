import mutations from "@/store/mutations";
const { DRAWER } = mutations;
const drawerStore = {
  state: {
    drawer: false
  },
  getters: {
    drawer: ({ drawer }) => drawer
  },
  mutations: {
    [DRAWER](state, bool) {
      state.drawer = bool;
    }
  },
  actions: {
    toggleDrawer({ commit }, bool) {
      commit("DRAWER", bool);
    }
  }
};

export default drawerStore;
