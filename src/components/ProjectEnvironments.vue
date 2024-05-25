<script setup>
import {ref, watch} from 'vue'
import EnvironmentLastDeployment from '@/components/EnvironmentLastDeployment.vue'
import {useEnvironmentsStore} from "@/stores/environments";

const props = defineProps({
  projectId: Number,
  search: String,
})

const store = useEnvironmentsStore()

let loadingEnvironments = ref(false)

let headers = [
  {sortable: false, width: '5%'},
  {key: 'name', title: 'Environment', sortable: false},
  {title: 'Up to', sortable: false},
  {title: 'Branch'},
  {title: 'Status'},
  {title: 'Deployment'},
]

watch(() => props.projectId, () => {
      loadingEnvironments.value = true;
      store.fetchEnvironments(props.projectId)
          .finally(() => loadingEnvironments.value = false);
    }
)
</script>

<template>
  <v-data-table
      :headers="headers"
      :items="store.environments"
      :loading="loadingEnvironments"
      :search="search"
  >
    <template v-slot:item="{ item }">
      <EnvironmentLastDeployment
          :key="item.name"
          :environment="item"
          :projectId="props.projectId"
      />
    </template>
  </v-data-table>
</template>
