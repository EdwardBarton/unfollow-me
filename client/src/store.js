import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    GET_FRIENDS(state, friends) {
      state.user.friends = friends;
    }
  },
  actions: {
    async getFriends({ commit }, handlesObj) {
      await fetch("http://127.0.0.1:8001/api/friends", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(handlesObj)
      }).then(async friends => {
        commit("GET_FRIENDS", await friends.json());
      });
    }
  }
});
