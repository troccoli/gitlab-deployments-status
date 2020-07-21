import Vue from 'vue'
import Vuex from 'vuex'
import GitLabService from "./services/GitLabService";

Vue.use(Vuex);

export default new Vuex.Store({
  state    : {
    starredProjects : [],
    projects     : [],
    environments     : [],
  },
  mutations: {
    SET_STARRED_PROJECTS(state, projects) {
      state.starredProjects = projects;
    },
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_ENVIRONMENTS(state, environments) {
      state.environments = environments;
    },
  },
  actions  : {
    fetchStarredProjects({commit}) {
      commit("SET_STARRED_PROJECTS", []);
      return GitLabService.getStarredProjects()
          .then(projects => {
            commit("SET_STARRED_PROJECTS", projects);
            return this;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log('There was an error: ', error);
          });
    },
    fetchProjects({commit}) {
      commit("SET_PROJECTS", []);
      return GitLabService.getProjects()
        .then(projects => {
          projects = projects.filter((project) => {
            return project['empty_repo'] === false
          });
          commit("SET_PROJECTS", projects);
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
        });
    },
    fetchEnvironments({commit}, {projectId}) {
      commit("SET_ENVIRONMENTS", []);
      return GitLabService.getEnvironments(projectId)
        .then(environments => {
          environments = environments.filter((environment) => {
            return environment.state === 'available'
          });
          commit("SET_ENVIRONMENTS", environments);
          return this;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
        });
    },
    fetchEnvironment({commit}, {projectId, environment, updatedBefore}) {
      return GitLabService.getEnvironment(projectId, environment, updatedBefore)
        .then(response => {
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
