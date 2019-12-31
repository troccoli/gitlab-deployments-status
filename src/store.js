import Vue from 'vue'
import Vuex from 'vuex'
import GitLabService from "./services/GitLabService";

Vue.use(Vuex);

export default new Vuex.Store({
  state    : {
    environments: [],
  },
  mutations: {
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    },
  },
  actions  : {
    fetchEnvironments({commit}) {
      return GitLabService.getEnvironments()
        .then(response => {
          commit("SET_ENVIRONMENTS", response.data.data);
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error.response);
        });
    },
  }
})
