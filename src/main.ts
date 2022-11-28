import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import App from '@/App.vue';
import '@/assets/css/app.css';
import { createHead } from '@vueuse/head';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(createHead({
    titleTemplate: (title) => {
      if (!title) {
        return 'Call of Duty Armory';
      }

      return `${title} – Call of Duty Armory`;
    },
  }))
  .mount('#app');
