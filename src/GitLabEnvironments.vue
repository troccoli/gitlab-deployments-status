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
                  :loading="isLoading"
          >
            <template v-slot:body="{ items }">
              <tbody>
              <Environment v-for="item in items" :key="item.name" :environment="item"/>
              </tbody>
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
      }
    },
    computed : {
      isLoading() {
        return this.$store.state.isLoading;
      }
    },
    created() {
      this.$store.dispatch("fetchEnvironments");
    },
  }
</script>
