import Vue from 'vue'
import Vuex from 'vuex'
import GitLabService from "./services/GitLabService";

Vue.use(Vuex);

export default new Vuex.Store({
  state    : {
    projectId : 39,
    environments     : [],
    isLoading        : true,
  },
  mutations: {
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions  : {
    fetchEnvironments({commit, state}) {
      commit("SET_LOADING", true);
      commit("SET_ENVIRONMENTS", []);
      return GitLabService.getEnvironments(state.projectId)
        .then(environments => {
          environments = environments.filter((environment) => {
            return environment.state === 'available'
          });
          commit("SET_ENVIRONMENTS", environments);
          commit("SET_LOADING", false);
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
          commit("SET_LOADING", false)
        });
    },
    fetchEnvironment({commit, state}, {environmentId}) {
      commit("SET_LOADING", true);
      return GitLabService.getEnvironment(state.projectId, environmentId)
        .then(response => {
          commit("SET_LOADING", false);
          return response
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
          commit("SET_LOADING", false)
        })
    }
  }
})
