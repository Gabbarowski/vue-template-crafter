<template>
  <div v-if="selectItem" :class="selectItem.cssClassesContainer.toString()" :style="selectItem.flexSize.inlineStyleCode.value">
    <div v-if="dropdownIsOpen">Test</div>
    <div :class="selectItem.cssClassesWrapper.toString()">
      <LabelTemplate :label-item="selectItem.label" :for-item="selectItem.uuid" />
      <select @click="onClickEvent"
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

function onClickEvent() {
  console.log("On Click")
  console.log(dropdownIsOpen.value)
  dropdownIsOpen.value=!dropdownIsOpen.value
  console.log(dropdownIsOpen.value)
}

function onBlur() {
  console.log("blur")
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