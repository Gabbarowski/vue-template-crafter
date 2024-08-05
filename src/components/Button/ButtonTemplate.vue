<!--
  - Copyright (c) 2024. Daniel Grabasch
  - All rights reserved
  - This File is Part of Vue Template Crafter
  -->

<template>
  <div v-if="!buttonItem">IS NOT SET</div>
  <button v-if="buttonItem && buttonItem.visible" :class="buttonItem.cssClasses.toString()" :style="buttonItem.flexSize.inlineStyleCode.value" @click="clickEvent">
    {{ buttonItem.label }}
  </button>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Button} from "./Button.ts";
import {Input} from "../Input/Input.ts";

const props = defineProps({
  buttonItem: Object as PropType<Button>,
  parentElement: {
    type: Object as PropType<Input>,
    default: null
  }
})

function clickEvent() {
  if(!props.buttonItem) return

  for(const clickEvent of props.buttonItem.clickEvents) {
    clickEvent()
  }
}

</script>

<style scoped>

</style>