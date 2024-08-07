<template>
  <h1>Das ist mein Test</h1>
  <button @click="testModal">RUN</button>
  <button @click="moveModal">Move Input System</button>
</template>

<script setup lang="ts">
import {FactoryCrafter} from "./components/Crafter/FactoryCrafter.ts";
import {Crafter} from "./components/Crafter/Crafter.ts";

interface Person {
  name: string,
  age: number,
  dsgvo: boolean
  categories: Category[]
  design: boolean
  sales: boolean
  marketing: boolean
  category: Category
}

interface Category {
  id: number,
  name: string
}

const allCategories = [
  {
    id: 1,
    name: "Design"
  },
  {
    id: 2,
    name: "Sales"
  },
  {
    id: 3,
    name: "Marketing"
  },
]


function testModal() {
  const crafter = new FactoryCrafter<Person>()
  crafter.setDefaultInputSize("100%")
  crafter.setObject({
    name: "Denise",
    age: 35,
    dsgvo: true,
    categories: [
    ],
    sales: true,
    marketing: false,
    design: false,
    category: "marketing"

  })
  crafter.addInputMapped("Alter", "age").setInputType("number")
  const password = crafter.addInput("Password").setInputType("password")
  crafter.addInput("Email").setInputType("email")
  crafter.addInput("Mobile").setInputType("tel")
  crafter.addInput("Geburtstag", "1991-05-01").setInputType("date")
  crafter.addInput("Created", "2017-06-01T08:30").setInputType("datetime-local")
  crafter.addHeader("Radio-Test", "h5")

  crafter.addRadioButtonMapped("Design", "category",null, "design")
  const salesRadion = crafter.addRadioButtonMapped("Sales", "category",null, "sales")
  crafter.addRadioButtonMapped("Marketing", "category",null, "marketing")

  crafter.addRadioButton("HUHU")

  crafter.addSelect("Kategorie")
      .addOption("My awesome Option")


  const {saveButton} = crafter.addSaveAndCloseButton()
  saveButton.onClick(() => {
    console.log(crafter.handleObject())
    crafter.addTextbox("HUHU")

  })
  crafter.openInModal()
}

function moveModal() {

  function analysePosition() {
    const allTrackInputs = playlist.getAllInputs()
    for (const track of allTrackInputs) {
      const upBtn = track.actionButtons.find(obj => obj.label === "Up")
      const downBtn = track.actionButtons.find(obj => obj.label === "Down")
      if(!upBtn || !downBtn) continue;
      upBtn.setHidden(track.isFirstItem())
      downBtn.setHidden(track.isLastItem())
    }
  }

  const playlist = new Crafter()
  playlist.addHeader("My awesome playlist").move("header")
  playlist.setDefaultInputSize("100%")
  playlist.addButton("Add song").onClick(() => {
    const track = playlist.addInput("Title")
    track.addButton("Up").onClick(() => {
      track.move("body", "up")
      analysePosition()
    })
    track.addButton("Down").onClick(() => {
      track.move("body", "down")
      analysePosition()
    })
    analysePosition()
  }).move("footerRight")

  playlist.openInModal()
}
</script>

<style scoped>

</style>