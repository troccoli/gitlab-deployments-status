import {inject, ref} from "vue"
import {defineStore} from "pinia"

export const useEnvironmentsStore = defineStore('environments', () => {
    const environments = ref([]);

    const GitLabService = inject('GitLabService')

    function fetchEnvironments(projectId) {
        environments.value = [];
        return GitLabService.getEnvironments(projectId)
            .then(env => {
                environments.value = env
                return this;
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log('There was an error during fetchEnvironments(): ', error);
            });
    }

    return {
        environments,
        fetchEnvironments
    }
})
