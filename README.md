# Vue Template Crafter

A powerful wizard to create fast and interactive Vue Templates while handling Objects.

Please note that this package is not yet ready. Therefore you should not use it in a live project yet.

Current Status: Developing!

&copy; Daniel Grabasch 2024

## Install

```
npm install vue-template-crafter
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
### Easy example

You can use this example in any Vue Template

```
<template>
    ...
       <CrafterTemplate :crafter="exampleCrafter" />
    ...
</template>

<script lang="ts" setup>
import {Crafter, CrafterTemplate} from "vue-template-crafer";

const exampleCrafter = new Crafter();
exampleCrafter.addHeader("My awesome formular")
const firstName = exampleCrafter.addInput("First name")
const lastName = exampleCrafter.addInput("Last name")
const email = exampleCrafter.addInput("Email")

const saveButton = exampleCrafter.addButton("Save").move("footerRight")
saveButton.onClick(() => {
    // One of many ways to input contents
    const firstNameValue = firstName.value as string
    const lastNameValue = lastName.value as string
    const emailValue = email.value as string
    
    /// ToDo everthing what you want
}) 

</script>
```