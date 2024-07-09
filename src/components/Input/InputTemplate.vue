<template>
  <div v-if="inputItem">
  <LabelTemplate :label-item="inputItem.label" />
  <input v-model="inputItem.value" />
  </div>
</template>

<script setup lang="ts">

import LabelTemplate from "../Label/LabelTemplate.vue";
import {PropType} from "vue";
import {Input} from "./Input.ts";

const props = defineProps({
  inputItem: Object as PropType<Input>
})
</script>

<style scoped>

</style>