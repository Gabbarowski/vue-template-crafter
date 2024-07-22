<template>
  <div class="c-input-wrapper" v-if="inputItem"  :style="inputItem.flexSize.inlineStyleCode.value">
    <div  class="c-form-floating">
      <input class="c-form-control"
            :class="inputItem.cssClasses.toString()"
             :id="inputItem.uuid"
             v-model="inputItem.value"
             :placeholder="' '"

      />
      <LabelTemplate :label-item="inputItem.label" :for="inputItem.uuid" />
    </div>
    <template v-for="button of inputItem.actionButtons">
      <ButtonTemplate :button-item="button" />
    </template>
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {onMounted, PropType} from "vue";
import {Input} from "./Input.ts";
import ButtonTemplate from "../Button/ButtonTemplate.vue";

const props = defineProps({
  inputItem: Object as PropType<Input>
})

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