<!--
  - Copyright (c) 2024. Daniel Grabasch
  - All rights reserved
  - This File is Part of Vue Template Crafter
  -->
<template>
  <div v-if="textAreaItem" :class="textAreaItem.cssClassesContainer.toString()" :style="textAreaItem.flexSize.inlineStyleCode.value">
    <LabelTemplate v-if="textAreaItem.label" :label-item="textAreaItem.label" />
    <div :class="textAreaItem.cssClassesWrapper.toString()">
      <textarea :class="textAreaItem.cssClassesItem.toString()"
                v-model="textAreaItem.value"
                :cols="textAreaItem.cols"
                :rows="textAreaItem.rows"
                :style="textAreaItem.getResizableStyle()"
      >

      </textarea>
    </div>
    <div v-if="textAreaItem && textAreaItem.errorMessage"
         :class="crafterStore.styleSetting.cssDefaultClass.alertMessage"
    >
      {{ textAreaItem.errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {TextArea} from "./TextArea.ts";
import LabelTemplate from "../Label/LabelTemplate.vue";
import {useTemplateCrafterStore} from "../templateCrafterStore";


const crafterStore = useTemplateCrafterStore()

defineProps({
  textAreaItem: Object as PropType<TextArea>
})

</script>

<style scoped>
</style>