<template>
  <template v-if="iconItem && !iconItem.hasWrapper">
    <component @click="clickEvent" :is="iconItem.htmlTag" :class="iconItem.cssClassesItem.toString()" />
  </template>
  <div v-if="iconItem && iconItem.hasWrapper" :class="iconItem.cssClassesWrapper.toString()">
    <component @click="clickEvent" :is="iconItem.htmlTag" :class="iconItem.cssClassesItem.toString()" />
  </div>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {Icon} from "./Icon";

const props = defineProps({
  iconItem: Object as PropType<Icon>
})

function clickEvent() {
  if(!props.iconItem) return
  props.iconItem.triggerClickEvents()
}

</script>

<style scoped>

</style>