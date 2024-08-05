<template>
    <component :is="headerItem.headerTag" v-if="headerItem" :class="headerItem.cssClasses.toString()">
      {{ headerItem.title }}
    </component>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Header} from "./Header.ts";

const props = defineProps({
  headerItem: Object as PropType<Header>
})

</script>

<style scoped>

</style>