<template>
  <v-app>
    <v-content>
      <v-container>
        <v-card>
          <v-card-title>
            <div class="mt-4">GitLab Environments Status</div>
            <v-spacer/>
            <v-select :items="projects()" label="Project" class="mt-7" @change="loadEnvironments()" v-model="projectId" :loading="loadingProjects"/>
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
        loadingProjects: false,
        loadingEnvironments: false,
        projectId: null,
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
        projects() {
          return this.$store.state.projects.map(project => {
            return {
              text: project.name,
              value: project.id,
            };
          });
        },
        environments() {
          return this.$store.state.environments
        },
      }
    },
    methods: {
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
        this.loadingProjects = false;
      });
    },
  }
</script>
