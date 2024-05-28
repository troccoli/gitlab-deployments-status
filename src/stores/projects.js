import {inject, ref} from "vue"
import {defineStore} from "pinia"

export const useProjectsStore = defineStore('projects', () => {
    const allProjects = ref([]);
    const starredProjects = ref([]);

    const GitLabService = inject('GitLabService')

    function fetchStarredProjects() {
        starredProjects.value = [];
        return GitLabService.getStarredProjects()
            .then(projects => {
                starredProjects.value = projects
                return this;
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error: ', error);
            });
    }

    function fetchProjects() {
        allProjects.value = []
        return GitLabService.getProjects()
            .then(projects => {
                projects = projects.filter((project) => {
                    return typeof project['empty_repo'] === 'undefined' || project['empty_repo'] === false
                });
                allProjects.value = projects
                return this;
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error: ', error);
            });
    }

    return {
        allProjects, starredProjects,
        fetchProjects, fetchStarredProjects
    }
})
