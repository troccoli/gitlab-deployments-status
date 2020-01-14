<template>
    <div>
        <p v-if="branch" class="my-auto">{{ branch }}</p>
        <v-skeleton-loader v-else ref="skeleton" type="text" :boilerplate="!loading"/>
    </div>
</template>

<script>
  export default {
    name : "EnvironmentBranch",
    props: {
      branch : {
        type: String,
      },
      loading: {
        type: Boolean,
      },
    },
  }
</script>

<style scoped>

</style>
