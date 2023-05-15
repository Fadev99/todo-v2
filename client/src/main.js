import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import { tasks } from './stores/tasks';

createApp(App).use(Quasar, quasarUserOptions).use(tasks).mount('#app');
