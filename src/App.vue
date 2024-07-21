<script setup lang="ts">
import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";

const crafter = new Crafter()
crafter.addHeader("My awesome Unicorn", "h3")
crafter.addHeader("My Subtitle", "h5")
crafter.addInput("Color", "")
crafter.addInput("Size", "")
crafter.addInput("Age", 23)
crafter.addInput("Style", "")
crafter.addInput("Favorite food", "Humans")
</script>

<template>
  <div>
    <CrafterTemplate :crafter="crafter" />
  </div>
</template>

<style >
@import "style.scss";

</style>
