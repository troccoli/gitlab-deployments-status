<script setup>
import {onMounted, ref} from 'vue'
import ProjectEnvironments from '@/components/ProjectEnvironments.vue'
import {useProjectsStore} from "@/stores/projects"
import {sortProjects} from "@/utilities/sorting";

const store = useProjectsStore()

let projects = ref([])
let loadingProjects = ref(false)
let search = ref('')

let projectId = ref(null)

onMounted(() => {
  loadingProjects.value = true

  store.fetchStarredProjects().then(() => {
    store.fetchProjects().then(() => {
      projects.value = sortProjects(store.allProjects, store.starredProjects);
    });
  }).finally(() => loadingProjects.value = false)
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card flat>
          <v-card-title class="px-0">
            <v-container>
              <v-row>
                <div data-cy="app-title" class="text-h2 mb-5">GitLab Environments Status</div>
              </v-row>
              <v-row>
                <v-col cols="8" class="pl-0">
                  <v-autocomplete v-model="projectId"
                                  :loading="loadingProjects"
                                  :items="projects"
                                  item-title="name_with_namespace"
                                  item-value="id"
                                  label="Project"
                                  variant="underlined"
                  />
                </v-col>
                <v-col class="pr-0">
                  <v-text-field
                      v-model="search"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="underlined"
                      hide-details
                      single-line
                      clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <ProjectEnvironments :projectId="projectId" :search="search"/>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
