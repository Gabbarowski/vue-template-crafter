<template>
  <label v-if="labelItem" :class="labelItem.cssClassesItem.toString()" :for="forItem">{{ labelItem.message }}</label>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Label} from "./Label.ts";

const props = defineProps({
  labelItem: Object as PropType<Label>,
  forItem: {
    type: String,
    default: ""
  }
})

</script>

<style scoped>

</style>