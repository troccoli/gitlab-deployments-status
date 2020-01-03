<template>
    <div>
        <div v-if="triggererIcon">
            <v-avatar size="36" class="mr-2">
                <img v-if="triggererIcon" :src="triggererIcon" alt="Icon"/>
            </v-avatar>
            {{ readableDate(deployedAt) }}
        </div>
        <v-avatar v-else color="grey" size="26">
            <span class="white--text">NA</span>
        </v-avatar>
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
        readableDate(date) {
          date = new Date(date)
          return date.toDateString()
        }
      }
    }
  }
</script>

<style scoped>

</style>
