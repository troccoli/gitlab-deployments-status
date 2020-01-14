<template>
    <tr>
        <td>{{ environment.name }}</td>
        <td><EnvironmentBranch :branch="environmentBranch(environment)"/></td>
        <td><EnvironmentStatus :status="environmentStatus(environment)"/></td>
        <td><EnvironmentDeployment :triggererIcon="deploymentTrigger(environment)" :deployedAt="deploymentFinishedAt(environment)"/></td>
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
    }
  }
</script>

<style scoped>

</style>
