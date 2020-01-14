<template>
    <div>
        <div v-if="triggererIcon">
            <v-avatar size="36" class="mr-2">
                <img v-if="triggererIcon" :src="triggererIcon" alt="Icon"/>
            </v-avatar>
            {{ readableDate(deployedAt) }}
        </div>
        <v-skeleton-loader v-else ref="skeleton" type="avatar" :boilerplate="boilerplate"/>
    </div>
</template>

<script>
  export default {
    name: "EnvironmentDeployment",
    props: {
      deployedAt: {
        type: String,
        required: true,
      },
      triggererIcon: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        boilerplate: true,
        readableDate(date) {
          date = new Date(date);
          return date.toDateString()
        }
      }
    }
  }
</script>

<style scoped>

</style>
