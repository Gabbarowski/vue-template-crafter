<template>
  <div :class="crafterStore.styleSetting.cssDefaultClass.checkbox" v-if="checkbox">
    <span v-if="checkbox.topic">{{ checkbox.topic }}</span>
    <template v-for="checkboxItem of checkbox.checkboxItems" :key="checkboxItem.uuid">
      <CheckboxItemTemplate :checkbox-item="checkboxItem" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Checkbox} from "./Checkbox";
import CheckboxItemTemplate from "./CheckboxItemTemplate.vue";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  checkbox: Object as PropType<Checkbox>
})

const crafterStore = useTemplateCrafterStore()

</script>

<style scoped>

</style>