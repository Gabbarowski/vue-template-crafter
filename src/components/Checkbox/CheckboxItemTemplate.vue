<template>
  <div :class="crafterStore.styleSetting.cssDefaultClass.checkbox" v-if="checkboxItem">
    <input type="checkbox" :id="checkboxItem.uuid" v-model="checkboxItem.value" />
    <LabelTemplate :label-item="checkboxItem.label" :for-item="checkboxItem.uuid" />
    <span v-if="checkboxItem.errorMessage"
          :class="crafterStore.styleSetting.cssDefaultClass.alertMessage"
    >
        {{ checkboxItem.errorMessage }}
      </span>
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {PropType} from "vue";
import {CheckboxItem} from "./CheckboxItem";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  checkboxItem: Object as PropType<CheckboxItem>
})

const crafterStore = useTemplateCrafterStore()

</script>

<style scoped>

</style>