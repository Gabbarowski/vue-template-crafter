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
crafter.setDefaultInputSize("100%", "100%", "50%")
const input1 = crafter.addInput("Color", "sd")
input1.addValidation((input) => {
      const result = Number(input.value)
      return !isNaN(result)
},
"Es ist keine Zahl!")

const input2 = crafter.addInput("Color", "").setRequired()
const input3 = crafter.addInput("Color", "")
input3.addButton("Test 1")
crafter.addButton("Validation"
).onClick(() => {
  if(crafter.validate()) alert("YES!")
})
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
