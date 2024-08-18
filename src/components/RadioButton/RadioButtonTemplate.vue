<template>
  <div v-if="radioButtonItem" :class="radioButtonItem.cssClassesWrapper.toString()">
    <input type="radio" :class="radioButtonItem.cssClassesItem.toString()"
           :id="radioButtonItem.uuid"
           :name="radioButtonItem.radioGroup"
           :checked="radioButtonItem.isChecked"
            @click="onChange"

    />
    <LabelTemplate :label-item="radioButtonItem.label" :for-item="radioButtonItem.uuid" />
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {RadioButton} from "./RadioButton";
import LabelTemplate from "../Label/LabelTemplate.vue";

const props = defineProps({
  radioButtonItem: Object as PropType<RadioButton>
})

function onChange() {
  if(!props.radioButtonItem) return
  props.radioButtonItem.setChecked(true, false)

}
</script>

<style scoped>

</style>