<template>
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
            />
        </v-card>
    </v-container>
</template>

<script>
  export default {
    name: "GitLabEnvironments",
    data() {
      return {
        search  : '',
        headers: [
          {
            text: 'Name',
            align:'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Branch', value: 'branch'},
          {text: 'Status', value: 'status'},
          {text: 'Deployed by', value: 'by'},
          {text: 'Deployed on', value: 'on'},
        ],
        environments() {
          return this.$store.state.environments.map(function (environment) {
            let lastDeployment = environment.last_deployment

            return {
              name: environment.name,
              branch: lastDeployment ? lastDeployment.ref : 'NA',
              status: lastDeployment ? lastDeployment.deployable.status : 'NA',
              by: lastDeployment ? lastDeployment.user.name : 'NA',
              on: lastDeployment ? lastDeployment.deployable.finished_at : 'NA',
            }
          })
        },
      }
    },
    created() {
      this.$store.dispatch("fetchEnvironments");
    },
  }
</script>

<style scoped>

</style>
