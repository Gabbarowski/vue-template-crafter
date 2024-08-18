# Crafter Class

The Crafter class acts as a link between all your components. Although all components can also be used individually, it is recommended that you use the Crafter class and the Crafter Vue template if you want to use more than one component.

You can use the Crafter in any Vue template and access the full functionality.

### Example

AnyVueTemplate.vue

```vue
<template>
    ...
       <CrafterTemplate :crafter="exampleCrafter" />
    ...
</template>

<script lang="ts" setup>
import {Crafter, CrafterTemplate} from "vue-template-crafer";

const exampleCrafter = new Crafter();
exampleCrafter.addHeader("My awesome formular")
const firstName = exampleCrafter.addInput("First name")
const lastName = exampleCrafter.addInput("Last name")
const email = exampleCrafter.addInput("Email")

const saveButton = exampleCrafter.addButton("Save").move("footerRight")
saveButton.onClick(() => {
    // One of many ways to input contents
    const firstNameValue = firstName.value as string
    const lastNameValue = lastName.value as string
    const emailValue = email.value as string
    
    /// ToDo everthing what you want
}) 
</script>

```

### Concept

The first Vue Template has six boxes.

While the first three boxes have special functions that enable easy responsiveness. The last three boxes are to be understood as simple containers to which the elements can be easily added, removed or moved.

````
<= InfoBox =><= HeaderBox =><= ActionBox =>

<============ Body Box ===================>

<====FooterLeft ===>  <=== FooterRight ===>
````

### Recommendation for starts
It is not necessary to understand all boxes and functions completely in order to take advantage of the plugin.

I recommend starting with the HeaderBox, BodyBox, FooterLeft and FooterRight. As these are the easiest to understand.

### Function description



### Other components [here](./../Components.README.md)