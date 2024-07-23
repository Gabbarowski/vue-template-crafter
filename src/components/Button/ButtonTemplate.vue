<template>
  <div v-if="!buttonItem">IS NOT SET</div>
  <button v-if="buttonItem" :class="buttonItem.cssClasses.toString()" :style="buttonItem.flexSize.inlineStyleCode.value">
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

</script>

<style scoped>

</style>