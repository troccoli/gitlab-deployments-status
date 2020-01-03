<template>
    <v-chip :color="getColor(value)" dark>{{ value }}</v-chip>
</template>

<script>
  export default {
    name : "EnvironmentStatus",
    props: {
      value: {
        type    : String,
        required: true,
      }
    },
    methods: {
      getColor(value) {
        if (value === 'success') {
          return 'green'
        }
        if (value === 'failed') {
          return 'red'
        }

        return 'gray'
      }
    }
  }
</script>

<style scoped>

</style>
