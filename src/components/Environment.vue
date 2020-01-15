<template>
    <tr>
        <td>
            <v-row>
                <v-switch inset :disabled="disabled" @change="loadEnvironment(environment.id)" class="d-inline"/>
                <p class="d-inline my-auto">{{ environment.name }}</p>
            </v-row>
        </td>
        <td>
            <EnvironmentBranch :branch="branchName" :loading="loading"/>
        </td>
        <td>
            <EnvironmentStatus :status="environmentStatus" :loading="loading"/>
        </td>
        <td>
            <EnvironmentDeployment :loading="loading"
                                   :triggererIcon="triggererIcon"
                                   :deployedAt="deployedAt"/>
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
        environmentRef: null,
        environmentId: null,
        deployableStatus: null,
        userAvatarUrl: null,
        deployableFinishedAt: null,
      }
    },
    computed : {
      branchName() {
        return this.environmentRef || '';
      },
      environmentStatus() {
        return this.deployableStatus || '';
      },
      triggererIcon() {
        return this.userAvatarUrl || '';
      },
      deployedAt() {
        return this.deployableFinishedAt || '';
      }
    },
    methods   : {
      loadEnvironment(environmentId) {
        this.disabled = true;
        this.loading = true;

        this.$store.dispatch("fetchEnvironment", {
          environmentId: environmentId
        }).then(response => {
          let lastDeployment = response.data.last_deployment;

          if (lastDeployment) {
            this.environmentRef = lastDeployment.ref;
            this.deployableStatus = lastDeployment.deployable.status;
            this.userAvatarUrl = lastDeployment.user.avatar_url;
            this.deployableFinishedAt = lastDeployment.deployable.finished_at;
          }

          this.loading = false;
        }).catch(error => {
          // eslint-disable-next-line no-console
          console.log('There was an error: ', error);
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
