<template>
  <label v-if="labelItem" :for="for">{{ labelItem.message }}</label>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Label} from "./Label.ts";

const props = defineProps({
  labelItem: Object as PropType<Label>,
  for: {
    type: String,
    default: ""
  }
})

</script>

<style scoped>

</style>