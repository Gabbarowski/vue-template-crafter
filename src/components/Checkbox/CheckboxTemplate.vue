<template>
  <div :class="checkbox.cssClassesWrapper.toString()" v-if="checkbox" :style="checkbox.flexSize.inlineStyleCode.value">
      <input type="checkbox" :class="checkbox.cssClassesItem.toString()" @change="onChange" :id="checkbox.uuid" v-model="checkbox.isChecked" />
      <LabelTemplate :label-item="checkbox.label" :for-item="checkbox.uuid" />
      <span v-if="checkbox.errorMessage"
            :class="crafterStore.styleSetting.cssDefaultClass.alertMessage"
      >
        {{ checkbox.errorMessage }}
      </span>
    </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Checkbox} from "./Checkbox";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import LabelTemplate from "../Label/LabelTemplate.vue";

const props = defineProps({
  checkbox: Object as PropType<Checkbox>
})

const crafterStore = useTemplateCrafterStore()

function onChange() {
  if(!props.checkbox) return
  for(const event of props.checkbox.changedEvents) {
    event()
  }
  if(props.checkbox.isChecked) {
    for(const event of props.checkbox.checkEvents) {
      event()
    }
  } else {
    for(const event of props.checkbox.uncheckEvents) {
      event()
    }
  }

}

</script>

<style scoped>

</style>