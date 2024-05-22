<script setup>
import { inject, onMounted, ref } from 'vue'
import ProjectEnvironments from '@/components/ProjectEnvironments.vue'

const GitLabService = inject('GitLabService')

let projects = ref([])
let loadingProjects = ref(false)
let search = ref('')

let projectId = ref(null)

onMounted(() => {
  loadingProjects.value = true
  let starredProjects = GitLabService.getStarredProjects()
  let allProjects = GitLabService.getProjects()

  starredProjects = starredProjects.map(p => p.name_with_namespace)
  allProjects.sort(function (a, b) {
    if (starredProjects.includes(a.name_with_namespace) && !starredProjects.includes(b.name_with_namespace)) {
      return -1
    }
    if (!starredProjects.includes(a.name_with_namespace) && starredProjects.includes(b.name_with_namespace)) {
      return 1
    }

    if (a.name_with_namespace < b.name_with_namespace) {
      return -1
    } else if (a.name_with_namespace > b.name_with_namespace) {
      return 1
    }
    return 0
  })

  projects.value = allProjects
  loadingProjects.value = false
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
          <ProjectEnvironments :project-id="projectId" :search="search"/>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
