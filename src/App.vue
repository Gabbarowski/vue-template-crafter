<script setup lang="ts">

import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";
import {useTemplateCrafterStore} from "./components/templateCrafterStore.ts";

const templateStore = useTemplateCrafterStore()
/*templateStore.styleSetting.cssDefaultClass.button = "button button-primary"
templateStore.styleSetting.cssDefaultClass.input = "form-control"*/

const crafterStore = useTemplateCrafterStore();
const crafter = new Crafter()
crafter.addHeader("My awesome Unicorn", "h3")
crafter.addHeader("My Subtitle", "h5")
const input1 = crafter.addInput("Color", "")
input1.flexSize.setWidth("50%","50%","50%")
const input2 = crafter.addInput("Color", "")
input2.flexSize.setWidth("50%","50%","50%")
const input3 = crafter.addInput("Color", "")
input3.addButton("Test 1")
crafter.addButton("Test 2")
input3.flexSize.setMaxWidth("50%","50%","50%")
input3.flexSize.setWidth(null,null,null)
 crafter.addInput("Color", "")
 crafter.addInput("Color", "")



</script>

<template>
  <div class="beg">
    <CrafterTemplate :crafter="crafter" />
  </div>
</template>

<style >
@import "style.scss";

</style>
