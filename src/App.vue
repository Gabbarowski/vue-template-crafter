<script setup lang="ts">
import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";
import {useTemplateCrafterStore} from "./components/templateCrafterStore.ts";
import {Button} from "./components/Button/Button.ts";

const crafterStore = useTemplateCrafterStore();
const crafter = new Crafter()
crafter.addHeader("My awesome Unicorn", "h3")
crafter.addHeader("My Subtitle", "h5")
const newBtn = crafter.addInput("Color", "")
    .addButton("Hallo Welt")
newBtn.flexSize.setMaxWidth("20px", "20px", "20px")
crafterStore.savePreset<Button>("MyButton");

const cloneBtn = crafterStore.getPreset("MyButton") as Button
crafter.addInput("Size", "").flexSize.setWidth("100%", "100%", "100%")
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
