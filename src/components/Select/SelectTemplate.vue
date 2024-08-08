<template>
  <div v-if="selectItem" :class="selectItem.cssClassesContainer.toString()" :style="selectItem.flexSize.inlineStyleCode.value">
    <div :class="selectItem.cssClassesWrapper.toString()">
      <LabelTemplate :label-item="selectItem.label" :for-item="selectItem.uuid" />
      <select @mousedown="onClickEvent"
              @blur="onBlur"
          :id="selectItem.uuid"
          v-model="selectItem.value"
          :class="selectItem.cssClassesItem.toString() + ' ' +  getSpecialCssStyle">

        <option value="" disabled selected hidden></option>
        <option @click="dropdownIsOpen=false" v-for="option of selectItem.options" :key="option.value" :value="option.value">
          {{option.label}}
        </option>
      </select>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import {Select} from "./Select";
import LabelTemplate from "../Label/LabelTemplate.vue";

const dropdownIsOpen = ref(false)

const props = defineProps({
  selectItem: Object as PropType<Select>
})

const isSelected = computed(() => {
  if(!props.selectItem) return false
  return !!props.selectItem.value;

})

function onClickEvent(e: Event) {
  const target = e.target as HTMLInputElement
  if(target.tagName === "SELECT") {
    dropdownIsOpen.value = !dropdownIsOpen.value
  } else {
    dropdownIsOpen.value = false
  }
}

function onBlur() {
  dropdownIsOpen.value = false
}

const getSpecialCssStyle = computed(() => {
  let string = ""
  if(isSelected.value) {
    string += "c-selected "
  }
  if(dropdownIsOpen.value) {
    string += "c-focus "
  }
  return string
})

</script>

<style scoped>

</style>