import axios from "axios";

const apiClient = axios.create({
  baseURL        : process.env.VUE_APP_GITLAB_BASE_URL + "/api/v4",
  withCredentials: false,
  headers        : {
    Accept        : "application/json",
    "Content-Type": "application/json",
    Authorization : process.env.VUE_APP_GITLAB_API_TOKEN,
  }
});

const projectId = 39

export default {
  getEnvironments() {
    return apiClient.get("/projects/" + projectId + "/environments");
  },
};
