<template>
  <v-app>
    <v-content>
      <v-container>
        <v-card>
          <v-card-title>
            GitLab Environments Status
            <v-spacer/>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            />
          </v-card-title>
          <v-data-table
                  :headers="headers"
                  :items=environments()
                  :search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ environmentBranch(item) }}</td>
                <td>
                  <EnvironmentStatus :value="environmentStatus(item)"/>
                </td>
                <td>
                  <EnvironmentDeployment :triggererIcon="deploymentTrigger(item)" :deployedAt="deploymentFinishedAt(item)"/>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-content>
    <v-overlay :value=overlay()>
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </v-app>
</template>

<script>
import EnvironmentStatus from "./components/EnvironmentStatus";
import EnvironmentDeployment from "./components/EnvironmentDeployment";

  export default {
    name      : "GitLabEnvironments",
    components: {EnvironmentDeployment, EnvironmentStatus},
    data() {
      return {
        overlay() {
          return this.$store.state.isLoading;
        },
        search : '',
        headers: [
          {
            text    : 'Name',
            align   : 'left',
            sortable: false,
            value   : 'name'
          },
          {text: 'Branch', value: 'branch'},
          {text: 'Status'},
          {text: 'Deployment'},
        ],
        environments() {
          return this.$store.state.environments
        },
        environmentBranch(environment) {
          let lastDeployment = environment.last_deployment

          return lastDeployment ? lastDeployment.ref : 'NA'
        },
        environmentStatus(environment) {
          let lastDeployment = environment.last_deployment

          return lastDeployment ? lastDeployment.deployable.status : 'NA'
        },
        deploymentTrigger(environment) {
          let lastDeployment = environment.last_deployment

          return lastDeployment ? lastDeployment.user.avatar_url : ''
        },
        deploymentFinishedAt(environment) {
          let lastDeployment = environment.last_deployment

          return lastDeployment ? lastDeployment.deployable.finished_at : 'NA'
        }
      }
    },
    created() {
      this.$store.dispatch("fetchEnvironments");
    },
  }
</script>
