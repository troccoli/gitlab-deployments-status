import Vue from 'vue'
import GitLabEnvironments from "./GitLabEnvironments";
import vuetify from './plugins/vuetify';
import store from "./store";

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(GitLabEnvironments)
}).$mount('#app')
