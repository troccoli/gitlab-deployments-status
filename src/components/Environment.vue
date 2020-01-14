<template>
    <tr>
        <td>
            <v-row>
                <v-switch inset :disabled="disabled" @change="loadEnvironment" class="d-inline"/>
                <p class="d-inline my-auto">{{ environment.name }}</p>
            </v-row>
        </td>
        <td>
            <EnvironmentBranch :branch="environmentBranch(environment)" :loading="loading"/>
        </td>
        <td>
            <EnvironmentStatus :status="environmentStatus(environment)" :loading="loading"/>
        </td>
        <td>
            <EnvironmentDeployment :loading="loading"
                                   :triggererIcon="deploymentTrigger(environment)"
                                   :deployedAt="deploymentFinishedAt(environment)"/>
        </td>
    </tr>
</template>

<script>
  import EnvironmentBranch from "./EnvironmentBranch";
  import EnvironmentStatus from "./EnvironmentStatus";
  import EnvironmentDeployment from "./EnvironmentDeployment";

  export default {
    name      : "Environment",
    components: {EnvironmentDeployment, EnvironmentStatus, EnvironmentBranch},
    props     : {
      environment: {
        type    : Object,
        required: true,
      }
    },
    data() {
      return {
        disabled: false,
        loading : false,
        environmentBranch(environment) {
          let lastDeployment = environment.last_deployment;

          return lastDeployment ? lastDeployment.ref : ''
        },
        environmentStatus(environment) {
          let lastDeployment = environment.last_deployment;

          return lastDeployment ? lastDeployment.deployable.status : ''
        },
        deploymentTrigger(environment) {
          let lastDeployment = environment.last_deployment;

          return lastDeployment ? lastDeployment.user.avatar_url : ''
        },
        deploymentFinishedAt(environment) {
          let lastDeployment = environment.last_deployment;

          return lastDeployment ? lastDeployment.deployable.finished_at : 'NA'
        }
      }
    },
    methods   : {
      loadEnvironment() {
        this.disabled = true;
        this.loading = true;
      }
    }
  }
</script>

<style scoped>

</style>
