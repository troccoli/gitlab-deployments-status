<script setup>
import { computed, ref } from 'vue'
import moment from 'moment'

defineEmits(['update-date'])
defineProps({
  showIt: Boolean,
  loading: Boolean,
})

let cutOffDate = ref(new Date())

let readableDate = computed(() => moment(cutOffDate.value).format('ddd, ll'))

</script>
<template>
  <div>
    <v-date-input
        v-if="showIt"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        variant="underlined"
        v-model="cutOffDate"
        :max="new Date()"
        readonly
        hide-details
        id="input-field"
        @update:modelValue="$emit('update-date', cutOffDate)"
    >
      {{ readableDate }}
    </v-date-input>
    <v-skeleton-loader v-else ref="skeleton" type="text" :boilerplate="!loading"/>
  </div>
</template>

<style lang="scss">
#input-field {
  display: none !important;
}
</style>
