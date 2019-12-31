import Vue from 'vue'
import Vuex from 'vuex'
import GitLabService from "./services/GitLabService";

Vue.use(Vuex);

export default new Vuex.Store({
  state    : {
    environments: [],
  },
  mutations: {
    CLEAR_ENVIRONMENTS(state) {
      state.environments = []
    },
    ADD_ENVIRONMENT(state, environment) {
      state.environments.push(environment)
    }
  },
  actions  : {
    fetchEnvironments({commit}) {
      commit("CLEAR_ENVIRONMENTS")
      return GitLabService.getEnvironments()
        .then(response => {
          response.data.forEach(function (environment) {
            let environmentState = environment.state
            let environmentId = environment.id

            if (environmentState === 'available') {
              GitLabService.getEnvironment(environmentId)
                .then(response => {
                  let environment = response.data

                  commit("ADD_ENVIRONMENT", environment);
                })
            }
          })
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error.response);
        });
    },
  }
})
