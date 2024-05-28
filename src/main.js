/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

// Components
import App from './App.vue'

// Services
import GitLabService from "@/services/GitLabService"
import MockGitLabService from "@/services/MockGitLabService"

// Application
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

app.provide('GitLabService', GitLabService)

if (!import.meta.env.PROD) {
    MockGitLabService.mock(GitLabService.client())
}

app.mount('#app')
