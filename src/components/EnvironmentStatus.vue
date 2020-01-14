<template>
    <div>
        <v-chip v-if="status" key="environment-status" :color="color()" dark>{{ status }}</v-chip>
        <v-skeleton-loader v-else ref="skeleton" type="chip" :boilerplate="boilerplate"/>
    </div>
</template>

<script>
  export default {
    name : "EnvironmentStatus",
    props: {
      status: {
        type    : String,
        required: true,
      }
    },
    data() {
      return {
        boilerplate: true,
        color() {
          if (this.status === 'success') {
            return 'green'
          }
          if (this.status === 'failed') {
            return 'red'
          }

          return 'gray'
        }
      }
    },
  }
</script>
