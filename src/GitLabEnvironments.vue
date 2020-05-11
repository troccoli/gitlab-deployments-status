<template>
    <v-app>
        <v-content>
            <v-container>
                <v-card>
                    <v-card-title>
                        <div class="mt-4">GitLab Environments Status</div>
                        <v-spacer/>
                        <v-autocomplete :items="projects"
                                  item-text="name_with_namespace"
                                  item-value="id"
                                  label="Project"
                                  class="mt-7"
                                  @change="loadEnvironments()"
                                  v-model="projectId"
                                  :loading="loadingProjects"
                        />
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
                            :loading="loadingEnvironments"
                    >
                        <template v-slot:item="{ item }">
                            <Environment :key="item.name" :environment="item"/>
                        </template>
                    </v-data-table>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import Environment from "./components/Environment";

  export default {
    name      : "GitLabEnvironments",
    components: {Environment},
    data() {
      return {
        loadingProjects    : false,
        loadingEnvironments: false,
        projectId          : null,
        search             : '',
        headers            : [
          {
            text    : 'Name',
            align   : 'left',
            sortable: false,
            value   : 'name',
            class   : 'header'
          },
          {
            text    : 'From',
            sortable: false,
            value   : 'from',
            class   : 'header'
          },
          {text: 'Branch', value: 'branch',
            class   : 'header'},
          {text: 'Status',
            class   : 'header'},
          {text: 'Deployment',
            class   : 'header'},
        ],
        projects: [],
        environments() {
          return this.$store.state.environments
        },
      }
    },
    methods   : {
      loadEnvironments() {
        this.loadingEnvironments = true;
        this.$store.dispatch("fetchEnvironments", {
          projectId: this.projectId,
        }).then(() => {
          this.loadingEnvironments = false;
        });
      },
    },
    created() {
      this.loadingProjects = true;
      this.$store.dispatch("fetchProjects").then(() => {
        let projects = this.$store.state.projects;
        projects.sort(function (a, b) {
          if (a.name_with_namespace === 'shopworks / shopworks') {
            return -1;
          }

          if (b.name_with_namespace === 'shopworks / shopworks') {
            return 1;
          }

          if (a.name_with_namespace < b.name_with_namespace) {
            return -1;
          } else if (a.name_with_namespace > b.name_with_namespace) {
            return 1;
          }
          return 0;
        });
        this.projects = projects;
        this.loadingProjects = false;
      });
    },
  }
</script>

<style scoped>
    .v-data-table > th {
        padding-left: 8px !important;
        padding-right: 0 !important;
    }
</style>
