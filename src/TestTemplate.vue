<template>
  <h1>Das ist mein Test</h1>
</template>

<script setup lang="ts">
import {Crafter} from "./components/TemplateBoard/Crafter.ts";
import {reactive} from "vue";

const crafter = reactive(new Crafter())

crafter.addHeader("My awesome formular", "h3")
crafter.addHeader("My Subtitle", "h5")
crafter.setDefaultInputSize("100%", "100%", "100%")

crafter.addInput("Huhu", "").addButton("My Name").flexSize.setWidth("10rem")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addInput("Huhu 2", "")
crafter.addTextbox("My awesome message").addButton("Change")

crafter.addButton("Test")
crafter.addButton("Lol")
crafter.openInModal();

setTimeout(() => {
  crafter.setModalMaxWith("500px")
}, 2000)

</script>

<style scoped>

</style>