<template>
  <div v-if="breakItem" :class="breakItem.cssClassesItem.toString()" class="break-line"></div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Break} from "./Break.ts";

const props = defineProps({
  breakItem: Object as PropType<Break>
})
</script>

<style scoped>
.break-line {
  width: 100%;
}
</style>