<template>
  <button v-if="buttonItem" :class="buttonItem.cssClasses.toString()" :style="buttonItem.flexSize.inlineStyleCode.value">
    {{ buttonItem.label }}
  </button>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {Button} from "./Button.ts";

const props = defineProps({
  buttonItem: Object as PropType<Button>
})

</script>

<style scoped>

</style>