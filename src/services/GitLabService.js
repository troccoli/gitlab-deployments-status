import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://gitlab.com/api/v4",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Private-Token": import.meta.env.VITE_APP_GITLAB_API_TOKEN,
    }
});

export default {
    client() {
        return apiClient
    },

    async getStarredProjects() {
        return await apiClient.get("/projects", {
            params: {
                archived: false,
                membership: true,
                starred: true
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.log('There was an error during getStarredProjects(): ', error);
        });
    },

    async getProjects() {
        let projects = []
        let page = 1

        let response
        do {
            response = await apiClient.get("/projects", {
                params: {
                    archived: false,
                    membership: true,
                    page: page++
                }
            }).catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error during getProjects(): ', error);
            })

            projects = projects.concat(response.data)
        }
        while ('x-next-page' in response.headers && response.headers['x-next-page'].length)

        return projects
    },

    async getEnvironments(projectId) {
        let environments = []
        let page = 1

        let response
        do {
            response = await apiClient.get("/projects/" + projectId + "/environments", {
                params: {
                    page: page++
                }
            }).catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error during getEnvironments(): ', error);
            });

            environments = environments.concat(response.data)
        } while ('x-next-page' in response.headers && response.headers['x-next-page'].length)

        return environments
    },

    async getLastDeployment(projectId, environmentName, cutoffDate) {
        cutoffDate.setHours(0, 0, 0, 0)
        return await apiClient.get("/projects/" + projectId + "/deployments", {
            params: {
                status: "success",
                order_by: "created_at",
                sort: "desc",
                environment: environmentName,
                updated_before: cutoffDate.toISOString()
            }
        }).then(response => response.data[0])
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error during getLastDeployment(): ', error);
            });
    }
}
