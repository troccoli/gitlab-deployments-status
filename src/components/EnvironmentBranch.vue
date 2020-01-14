<template>
    <div>
        <p v-if="branch">{{ branch }}</p>
        <v-skeleton-loader v-else ref="skeleton" type="text" :boilerplate="boilerplate"/>
    </div>
</template>

<script>
  export default {
    name: "EnvironmentBranch",
    props: {
      branch: {
        type: String,
      }
    },
    data() {
      return {
        boilerplate: true
      }
    }
  }
</script>

<style scoped>

</style>
