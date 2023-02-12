import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PageLoading from './components/PageLoading.vue';

const app = createApp(App);
app.component('PageLoading', PageLoading);
app.config.globalProperties.$types = {
  typeList(value) {
    if (!value) return;
    if (value.length <= 1) return `${value[0].type.name}`;
    let list = "";
    for (const key in value) {
      if (Number(key) === 0) list += value[key].type.name;
      else list += ` | ${value[key].type.name}`;
    }
    return list;
  }
}
app.use(router);
app.mount('#app');
