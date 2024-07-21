<template>
  <div class="c-input-wrapper">
    <div v-if="inputItem" class="c-form-floating">
      <input class="c-form-control"
            :class="inputItem.cssClasses.toString()"
             :id="inputItem.uuid"
             v-model="inputItem.value"
             :placeholder="' '"

      />
      <LabelTemplate :label-item="inputItem.label" :for="inputItem.uuid" />
    </div>
    <button class="c-stylish-button">Test</button>
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {onMounted, PropType} from "vue";
import {Input} from "./Input.ts";

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