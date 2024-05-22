<script setup>
import { computed, inject, ref, watch } from 'vue'
import moment from 'moment'
import EnvironmentDate from '@/components/EnvironmentDate.vue'

const props = defineProps({
  projectId: Number,
  environment: {
    type: Object,
    required: true,
  },
})

const GitLabService = inject('GitLabService')

let date = ref(null)
let loading = ref(false)
let lastDeployment = ref(null)

let disabled = computed(() => date.value !== null)
let statusColor = computed(() => {
      if (null === lastDeployment) {
        return 'gray'
      }

      if (lastDeployment.value.deployable.status === 'success') {
        return 'green'
      }

      if (lastDeployment.value.deployable.status === 'failed') {
        return 'red'
      }

      return 'gray'
    },
)

watch(date, () => {
  loading.value = true

  // Get the deployments, with environment and date
  lastDeployment.value = GitLabService.getEnvironment(props.projectId, props.environment.name, date.value)

  loading.value = false
})
</script>

<template>
  <tr>
    <td class="pl-0">
      <v-switch
          inset
          hide-details
          :disabled="disabled"
          base-color="grey-lighten-1"
          @change="() => date = new Date()"
      />
    </td>
    <td>
      {{ environment.name }}
    </td>
    <td>
      <EnvironmentDate @update-date="(newDate) => date = newDate" :show-it="disabled" :loading="loading"/>
    </td>
    <td>
      <div>
        <p v-if="lastDeployment">{{ lastDeployment.ref }}</p>
        <v-skeleton-loader v-else type="list-item" :boilerplate="!loading"/>
      </div>
    </td>
    <td>
      <div>
        <v-chip v-if="lastDeployment" :color="statusColor">
          {{ lastDeployment.deployable.status }}
        </v-chip>
        <v-skeleton-loader v-else type="chip" :boilerplate="!loading"/>
      </div>
    </td>
    <td>
      <div>
        <div v-if="lastDeployment">
          <v-avatar size="36" class="mr-2">
            <img v-if="lastDeployment.user.avatar_url" :src="lastDeployment.user.avatar_url" alt="Icon"/>
          </v-avatar>
          {{ moment(lastDeployment.deployable.finished_at).format('llll') }}
        </div>
        <v-skeleton-loader v-else type="list-item-avatar" :boilerplate="!loading"/>
      </div>
    </td>
  </tr>
</template>
