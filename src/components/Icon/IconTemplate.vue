<template>
  <template v-if="iconItem">
    <component :is="iconItem.htmlTag" :class="iconItem.cssClassesItem.toString()" />
  </template>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {Icon} from "./Icon";

const props = defineProps({
  iconItem: Object as PropType<Icon>
})

</script>

<style scoped>

</style>