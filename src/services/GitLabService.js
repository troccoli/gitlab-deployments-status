import axios from "axios";

const apiClient = axios.create({
  baseURL        : process.env.VUE_APP_GITLAB_BASE_URL + "/api/v4",
  withCredentials: false,
  headers        : {
    Accept         : "application/json",
    "Content-Type" : "application/json",
    "Private-Token": process.env.VUE_APP_GITLAB_API_TOKEN,
  }
});

export default {
  async getStarredProjects() {
    let projects = []

    try {
      let response = await apiClient.get("/user");
      let user = response.data;

      response = await apiClient.get("/users/" + user.id + "/starred_projects");
      projects = response.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }

    return projects;
  },
  async getProjects() {
    let projects = []
    let page = 1

    try {
      let response
      do {
        response = await apiClient.get("/projects?archived=false&page=" + page++)

        projects = projects.concat(response.data)
      } while ('x-next-page' in response.headers && response.headers['x-next-page'].length)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }

    return projects
  },
  async getEnvironments(projectId) {
    let environments = []
    let page = 1

    try {
      let response
      do {
        response = await apiClient.get("/projects/" + projectId + "/environments?page=" + page++)

        environments = environments.concat(response.data)
      } while ('x-next-page' in response.headers && response.headers['x-next-page'].length)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }

    return environments
  },
  getEnvironment(projectId, environmentName, cutoffDate) {
    const queryString = "status=success&order_by=created_at&sort=desc" +
      "&environment=" + environmentName +
      "&updated_before=" + cutoffDate;

    return apiClient.get("/projects/" + projectId + "/deployments?" + queryString);
  }
};
