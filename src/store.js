import Vue from 'vue'
import Vuex from 'vuex'
import GitLabService from "./services/GitLabService";

Vue.use(Vuex);

export default new Vuex.Store({
  state    : {
    environments: [],
    totalEnvironments: 0,
    isLoading: true,
  },
  mutations: {
    CLEAR_ENVIRONMENTS(state) {
      state.environments = []
      state.totalEnvironments = 0
    },
    SET_TOTAL(state, value) {
      state.totalEnvironments = value
    },
    ADD_ENVIRONMENT(state, environment) {
      state.environments.push(environment)
      state.isLoading = state.environments.length < state.totalEnvironments
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions  : {
    fetchEnvironments({commit}) {
      commit("SET_LOADING", true)
      commit("CLEAR_ENVIRONMENTS")
      return GitLabService.getEnvironments()
        .then(environments => {
          environments = environments.filter((environment) => {
            return environment.state === 'available'
          })
          commit("SET_TOTAL", environments.length)
          environments.forEach(function (environment) {
            GitLabService.getEnvironment(environment.id)
              .then(response => {
                let environment = response.data

                commit("ADD_ENVIRONMENT", environment);
              })
        })
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
          commit("SET_LOADING", false)
        });
    },
  }
})
