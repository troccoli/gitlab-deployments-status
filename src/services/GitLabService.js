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

const projectId = 39

export default {
  async getEnvironments() {
    let environments = []
    let page = 1

    try {
      let response
      do {
        response = await apiClient.get("/projects/" + projectId + "/environments?page=" + page++)

        environments = environments.concat(response.data)
      } while (response.headers['x-next-page'].length !== 0)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }

    return environments
  },
  getEnvironment(environmentId) {
    return apiClient.get("/projects/" + projectId + "/environments/" + environmentId);
  }
};
