<template>
  <div class="c-input-wrapper" v-if="inputItem"  :style="inputItem.flexSize.inlineStyleCode.value">
    <div class="c-form-floating">
      <input class="c-form-control"
            :class="inputItem.getCssClasses()"
             :id="inputItem.uuid"
             v-model="inputItem.value"
             :placeholder="' '"
             :required="inputItem.isRequired"

      />
      <span v-if="inputItem.errorMessage"
            :class="crafterStore.styleSetting.cssDefaultClass.alertMessage"
      >
        {{ inputItem.errorMessage }}
      </span>
      <LabelTemplate :label-item="inputItem.label" :for="inputItem.uuid" />
    </div>
    <template v-for="button of inputItem.actionButtons">
      <ButtonTemplate :button-item="button" :parent-element="inputItem" />
    </template>
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {onMounted, PropType} from "vue";
import {Input} from "./Input.ts";
import ButtonTemplate from "../Button/ButtonTemplate.vue";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  inputItem: Object as PropType<Input>
})

const crafterStore = useTemplateCrafterStore();

function resizeEvent() {
  if(!props.inputItem) return
  props.inputItem.flexSize.calculateFlexSize()
}

onMounted(() => {
  window.addEventListener("resize", resizeEvent);
})
</script>

<style scoped>

</style>