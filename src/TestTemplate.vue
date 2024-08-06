<template>
  <h1>Das ist mein Test</h1>
  <button @click="testModal">RUN</button>
</template>

<script setup lang="ts">
import {FactoryCrafter} from "./components/Crafter/FactoryCrafter.ts";

interface Person {
  name: string,
  age: number
}


function testModal() {
  const crafter = new FactoryCrafter<Person>()
  crafter.setDefaultInputSize("100%")
  crafter.setObject({
    name: "Daniel",
    age: 33,
    dsgvo: true
  })
  crafter.addInputMapped("Name", "name")
  crafter.addInputMapped("Alter", "age").setInputType("number")
  const password = crafter.addInput("Password").setInputType("password")
  crafter.addInput("Email").setInputType("email")
  crafter.addInput("Mobile").setInputType("tel")
  crafter.addInput("Geburtstag", "1991-05-01").setInputType("date")
  crafter.addInput("Created", "2017-06-01T08:30").setInputType("datetime-local")
  const checkbox = crafter.addCheckbox("My awesome topic")
  checkbox.addCheckboxItemMapped("Confirm DSGVO", "dsgvo").setRequired()
  const {saveButton} = crafter.addSaveAndCloseButton()
  saveButton.onClick(() => {
    console.log(crafter.handleObject())
    crafter.addTextbox("HUHU")
  })
  crafter.openInModal()
}
</script>

<style scoped>

</style>