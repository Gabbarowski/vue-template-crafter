<template>
<div v-if="textbox" :class="textbox.cssClassesWrapper.toString()" :style="textbox.flexSize.inlineStyleCode.value">
  <div :class="textbox.cssClassesItem.toString()">
    {{ textbox.message }}
  </div>
<!--  ActionButtons-->
  <template v-for="actionButton of textbox.actionButtons" :key="actionButton.uuid">
    <ButtonTemplate :button-item="actionButton" />
  </template>
</div>
</template>

<script setup lang="ts">
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {PropType} from "vue";
import {Textbox} from "./Textbox.ts";
import ButtonTemplate from "../Button/ButtonTemplate.vue";

const crafterStore = useTemplateCrafterStore();

const props = defineProps({
  textbox: Object as PropType<Textbox>
})

</script>


<style scoped>

</style>