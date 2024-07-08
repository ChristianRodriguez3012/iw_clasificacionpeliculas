import { createApp } from "vue";
import axios from 'axios';
import App from "./App.vue";
import "../style.css";

// Configuración de Axios con el token CSRF
const csrfToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
);

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

createApp(App).mount("#app");
