<template>
  <v-app>
    <v-content>
      <GitLabEnvironments/>
    </v-content>
  </v-app>
</template>

<script>
import GitLabEnvironments from "./components/GitLabEnvironments";

export default {
  name: 'App',

  components: {
    GitLabEnvironments,
  },

  data: () => ({
    //
  }),
};
</script>
