<template>
    <div>
        <div v-if="triggererIcon">
            <v-avatar size="36" class="mr-2">
                <img v-if="triggererIcon" :src="triggererIcon" alt="Icon"/>
            </v-avatar>
            {{ readableDate(deployedAt) }}
        </div>
        <v-skeleton-loader v-else ref="skeleton" type="list-item-avatar" :boilerplate="!loading"/>
    </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name : "EnvironmentDeployment",
    props: {
      deployedAt   : {
        type    : String,
        required: true,
      },
      triggererIcon: {
        type    : String,
        required: true,
      },
      loading      : {
        type: Boolean,
      },
    },
    data() {
      return {
        readableDate(date) {
          return moment(date).format('llll');
        }
      }
    }
  }
</script>

<style scoped>
    .theme--light.v-skeleton-loader >>> .v-skeleton-loader__list-item-avatar {
        background-color: transparent;
    }
</style>
