// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VLazyImage from "v-lazy-image";

// CREATE VUE APP INSTANCE
const app = createApp(App);

app.component("VLazyImage", VLazyImage);

// USE ROUTER FOR MULTI PAGE NAVIGATION
app.use(router);

// MOUNT THE PAGE TO DIV WITH AN ID OF APP
app.mount("#app");
