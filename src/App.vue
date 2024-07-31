<script setup lang="ts">
import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";

const crafter = new Crafter()
crafter.addHeader("My awesome formular", "h3")
crafter.addHeader("My Subtitle", "h5")
crafter.setDefaultInputSize("100%", "100%", "100%")

crafter.addInput("Huhu", "")

</script>

<template>
  <div class="beg">
    <CrafterTemplate :crafter="crafter" />
  </div>
</template>

<style >
@import "style.scss";

</style>
