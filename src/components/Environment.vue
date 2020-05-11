<template>
    <tr>
        <td>
            <v-row>
                <v-switch inset :disabled="disabled" @change="loadEnvironment(date)" class="d-inline ml-2"/>
                <p class="d-inline my-auto">{{ environment.name }}</p>
            </v-row>
        </td>
        <td>
            <EnvironmentDate @update-date="loadEnvironment" :show-it="disabled" :loading="loading"/>
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
  import EnvironmentDate from "./EnvironmentDate";

  export default {
    name      : "Environment",
    components: {EnvironmentDate, EnvironmentDeployment, EnvironmentStatus, EnvironmentBranch},
    props     : {
      environment: {
        type    : Object,
        required: true,
      }
    },
    data() {
      return {
        disabled            : false,
        loading             : false,
        environmentRef      : null,
        date                : null,
        deployableStatus    : null,
        userAvatarUrl       : null,
        deployableFinishedAt: null,
      }
    },
    computed  : {
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
      },
    },
    watch     : {
      date: function () {
        this.loadEnvironmentFromDate(this.environment, this.date)
      }
    },
    methods   : {
      loadEnvironmentFromDate(environment, fromDate) {
        this.disabled = true;
        this.loading = true;

        this.$store.dispatch("fetchEnvironment", {
          projectId    : environment.project.id,
          environment: environment.name,
          updatedBefore: fromDate
        }).then(response => {
          let lastDeployment = response.data[0];

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
      },
      loadEnvironment(date) {
        if (date === null) {
          date = (new Date()).toISOString().split('T')[0]
        }
        this.date = date;
      }
    }
  }
</script>

<style scoped>
    td {
        padding-left: 8px !important;
        padding-right: 0 !important;
    }

    td:first-child {
        padding-left: 16px !important;
    }
</style>
