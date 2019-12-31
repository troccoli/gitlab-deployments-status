import axios from "axios";

const apiClient = axios.create({
  baseURL        : "/api/v4",
  withCredentials: false,
  headers        : {
    Accept        : "application/json",
    "Content-Type": "application/json",
    Authorization : "TOKEN",
  }
});

const projectId = 39

export default {
  getEnvironments() {
    return apiClient.get("/projects/" + projectId + "/environments");
  },
};
