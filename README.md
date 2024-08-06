# Vue Template Crafter

A powerful wizard to create fast and interactive Vue Templates while handling Objects.

Please note that this package is not yet ready. Therefore you should not use it in a live project yet.

Current Status: Developing!

&copy; Daniel Grabasch 2024

## What the plugin can do

The package allows you to quickly create intelligent templates. 
Especially for forms it is a great time saver. 
This is because the elements communicate with each other and therefore various validations and queries can be created quickly, easily and reliably.

## What the plugin can't do

This is no css framework or something like that. You can add the css from this library, but I suggest to create your own CSS or SCSS files.

You can modified many classes with StyleSettings Class.

For more information see:
[Style Settings](./src/components/Utility/StyleSettings.README.md)

## Install

```
npm i vue-template-crafter
```

## Setup

main.js
```
import { createApp } from 'vue'
import App from './App.vue'
import VueTemplateCrafter from "vue-template-crafter"

// Optional If you want to use default Styling of vue-template-crafter
import 'vue-template-crafter/style.css'

createApp(App)
    .use(VueTemplateCrafter)
    .mount('#app');
```

## How to use

The most interesting way is to start with a Crafter Class and CrafterTemplate.
[Crafter Component](src/components/Crafter/Crafter.README.md)