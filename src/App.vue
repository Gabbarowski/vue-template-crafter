<script setup lang="ts">
import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";

const crafter = new Crafter()
crafter.addHeader("My awesome formular", "h3")
crafter.addHeader("My Subtitle", "h5")
crafter.setDefaultInputSize("100%", "100%", "100%")

crafter.addInput("Huhu", "").addButton("My Name").flexSize.setWidth("10rem")
crafter.addInput("Huhu 2", "")
crafter.addTextbox("My awesome message").addButton("Change")
</script>

<template>
  <div class="beg">
    <CrafterTemplate :crafter="crafter" />
  </div>
</template>

<style >
@import "style.scss";

.beg {
  max-width: 109rem;
  margin: auto;
}

</style>
