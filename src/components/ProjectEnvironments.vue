<script setup>
import { ref } from 'vue'
import EnvironmentLastDeployment from '@/components/EnvironmentLastDeployment.vue'

defineProps({
  projectId: Number,
  search: String,
})

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
  let environments = []
  if (projectId === 6) {
    environments = [
      {
        'id': 1,
        'name': 'fix/fix-foo',
      },
      {
        'id': 2,
        'name': 'feature/new-feature',
      },
      {
        'id': 5,
        'name': 'fix/nasty-bug',
      },
      {
        'id': 12,
        'name': 'fix/stupid-bug',
      },
    ]
  }

  return environments
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
