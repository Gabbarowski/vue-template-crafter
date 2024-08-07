<template>
  <div :class="inputItem.cssClassesContainer.toString()" v-if="inputItem"  :style="inputItem.flexSize.inlineStyleCode.value">
    <div :class="inputItem.cssClassesWrapper.toString()">
      <LabelTemplate :label-item="inputItem.label" :forItem="inputItem.uuid" />
      <InputTemplate :input-item="inputItem" v-if="isClassicInput" />
      <span v-if="inputItem.errorMessage"
            :class="crafterStore.styleSetting.cssDefaultClass.alertMessage"
      >
        {{ inputItem.errorMessage }}
      </span>
    </div>
    <template v-for="button of inputItem.actionButtons">
      <ButtonTemplate :button-item="button as Button" :parent-element="inputItem" />
    </template>
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {computed, onMounted, PropType} from "vue";
import {Input} from "./Input";
import ButtonTemplate from "../Button/ButtonTemplate.vue";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Button} from "../Button/Button.ts";
import InputTemplate from "./DefaultInputTemplate.vue";
import {InputType} from "./InputType";

const props = defineProps({
  inputItem: Object as PropType<Input>
})

const crafterStore = useTemplateCrafterStore();

function resizeEvent() {
  if(!props.inputItem) return
  props.inputItem.flexSize.calculateFlexSize()
}

const isClassicInput = computed(() => {
  const supportedTypes: InputType[] = ["text", "password", "date", "tel", "number","email", "datetime-local"];
  return props.inputItem ? supportedTypes.includes(props.inputItem.inputType as InputType) : false;
})

onMounted(() => {
  window.addEventListener("resize", resizeEvent);
})
</script>

<style scoped>

</style>