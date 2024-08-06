<!--
  - Copyright (c) 2024. Daniel Grabasch
  - All rights reserved
  - This File is Part of Vue Template Crafter
  -->

<template>
  <div v-if="!buttonItem">IS NOT SET</div>
  <button v-if="buttonItem && buttonItem.visible" :class="buttonItem.cssClasses.toString()" :style="buttonItem.flexSize.inlineStyleCode.value" @click="clickEvent">
    <span v-if="buttonItem.icon">
      <i :class="buttonItem.icon"></i>
    </span>
    <span>
      {{ buttonItem.label }}
    </span>
    <span v-if="buttonItem.isLoading" :class="crafterStore.styleSetting.cssDefaultClass.loadingSpinner"></span>
  </button>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Button} from "./Button.ts";
import {Input} from "../Input/Input.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  buttonItem: Object as PropType<Button>,
  parentElement: {
    type: Object as PropType<Input>,
    default: null
  }
})

const crafterStore = useTemplateCrafterStore()


function clickEvent() {
  if(!props.buttonItem) return
  const crafter = props.buttonItem.crafter;
  if(crafter && !crafter.validate()) {
    return;
  }
  for(const clickEvent of props.buttonItem.clickEvents) {
    clickEvent()
  }
}

</script>

<style scoped>

</style>