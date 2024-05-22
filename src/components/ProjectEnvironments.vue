<script setup>
import { inject, ref } from 'vue'
import EnvironmentLastDeployment from '@/components/EnvironmentLastDeployment.vue'

defineProps({
  projectId: Number,
  search: String,
})

const GitLabService = inject('GitLabService')

let loading = ref(false)

let headers = [
  { sortable: false, width: '5%' },
  { key: 'name', title: 'Environment', sortable: false },
  { title: 'Up to', sortable: false },
  { title: 'Branch' },
  { title: 'Status' },
  { title: 'Deployment' },
]

function environments (projectId) {
  return GitLabService.getEnvironments(projectId)
}
</script>

<template>
  <v-data-table
      :headers="headers"
      :items="environments(projectId)"
      :loading="loading"
      :search="search"
  >
    <template v-slot:item="{ item }">
      <EnvironmentLastDeployment
          :key="item.name"
          :environment="item"
          :projectId="projectId"
      />
    </template>
  </v-data-table>
</template>
