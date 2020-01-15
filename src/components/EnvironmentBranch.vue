<template>
    <div>
        <p v-if="branch" class="my-auto">{{ branch }}</p>
        <v-skeleton-loader v-else ref="skeleton" type="list-item" :boilerplate="!loading" style="background-color: transparent"/>
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
    .theme--light.v-skeleton-loader >>> .v-skeleton-loader__list-item {
        background-color: transparent;
    }
</style>
