<template>
  <h1>Das ist mein Test</h1>
  <button @click="testModal">RUN</button>
  <button @click="moveModal">Move Input System</button>
  <button @click="textAreaTest">TextArea Test</button>
</template>

<script setup lang="ts">
import {FactoryCrafter} from "./components/Crafter/FactoryCrafter";
import {Crafter} from "./components/Crafter/Crafter";

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
    category:  {
      id: 3,
      name: "Marketing"
    }

  })
  crafter.addInputMapped("Alter", "age").setInputType("number")
  const password = crafter.addInput("Password").setInputType("password")
  crafter.addInput("Email").setInputType("email")
  crafter.addInput("Mobile").setInputType("tel")
  crafter.addInput("Geburtstag", "1991-05-01").setInputType("date").map("created")
  crafter.addInput("Created", "2017-06-01T08:30").setInputType("datetime-local").map("dateTime")
  crafter.addRadioButton("BMW", "cars")
  crafter.addRadioButton("Audi", "cars").setChecked()
  crafter.addRadioButton("Mercedes", "cars")


  crafter.addSelectMapped("Kategorie", "category").addOptionArray<Category>(allCategories, (option) => {
    return option.name
  })

  crafter.addButton("Analyse").onClick(() => {
    if(crafter.isChanged()) crafter.addTextbox("Values has been changed")
    else crafter.addTextbox("Values are not changed")
  }).move("footerLeft")


  const {saveButton} = crafter.addSaveAndCloseButton()
  saveButton.onValidClick(() => {
    console.log(crafter.handleObject())
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

  const playlist = new Crafter().getReactive()

  playlist.addTextArea("My Textarea")

  playlist.selectContainer("header")
  playlist.addHeader("My awesome playlist")
  playlist.setDefaultInputSize("100%")
  playlist.selectContainer("footerRight")
  playlist.addButton("Add song").onClick(() => {
    playlist.selectContainer("body")
    const track = playlist.addInput("Title")
    track.addButton("Up").onClick(() => {
      track.move("body", "up")
      analysePosition()
    })
    track.addButton("Down").onClick(() => {
      playlist.selectContainer("body")
      track.move("body", "down")
      analysePosition()
    })
    analysePosition()
  })

  playlist.addButton("500px").onClick(() => {
    playlist.setModalMaxWith("500px")
  })
  playlist.addButton("1000px").onClick(() => {
    playlist.setModalMaxWith("1000px")
  })

  playlist.openInModal()
}

function textAreaTest() {
  const myObject = {
    info: "Hallo Welt"
  }
  const textAreaTest = new FactoryCrafter().getReactive()
  textAreaTest.setObject(myObject)
  textAreaTest.addInput("Test").setRequired()
  textAreaTest.addTextAreaMapped("jiji", "info").setRows(30).setIsResizable("horizontal").setRequired()

  textAreaTest.addButton("Ausführen").onClick(() => {
    const item = textAreaTest.handleObject(true)
    console.log(item)
  }).move("footerRight")
  textAreaTest.openInModal()
}
</script>

<style scoped>

</style>