<template>
  <template v-if="inputItem">
  <input
      @keydown.enter="enterKeyEvent"
      :class="inputItem.getCssClasses()"
      :id="inputItem.uuid"
      v-model="inputItem.value"
      :placeholder="' '"
      :required="inputItem.isRequired"
      :type="inputItem.inputType"
      :disabled="!inputItem.enable"
  />
  </template>
</template>
<script setup lang="ts">
import {Input} from "./Input";
import {PropType} from "vue";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  inputItem: Object as PropType<Input>
})

const crafterStore = useTemplateCrafterStore();

function enterKeyEvent() {
  if(!props.inputItem) return;
  const crafter = props.inputItem.crafter
  if(!crafter) return;
  for(const button of crafter.getAllButtons()) {
    if(button.inputKeyEnterExecution) {
      button.triggerClickEvents()
    }
  }
}
</script>

<style scoped>

</style>