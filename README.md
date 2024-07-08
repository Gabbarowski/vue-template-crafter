# Vue Template Crafter

A powerful wizard to create fast and interactive Vue Templates while handling Objects.

Please note that this package is not yet ready. Therefore you should not use it in a live project yet.

Current Status: Developing!

&copy; Daniel Grabasch 2024

Plugin Setup
```
npm install vue-template-crafter
```

main.js
```
import { createApp } from 'vue'
import App from './App.vue'
import VueTemplateCrafter from "vue-template-crafter"

createApp(App)
    .use(VueTemplateCrafter)
    .mount('#app');
```
