import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import '../style.css';

// Configuración de Axios con el token CSRF (opcional, si es necesario)
const csrfToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
);

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

const app = createApp(App);
app.config.globalProperties.$axios = axios; // Para hacer axios disponible globalmente

app.use(router);
app.mount('#app');
