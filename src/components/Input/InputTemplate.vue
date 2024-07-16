<template>
  <div v-if="inputItem" class="form-floating">
    <input class="form-control"
          :class="inputItem.cssClasses.toString()"
           :id="inputItem.uuid"
           v-model="inputItem.value"
           :placeholder="' '"

    />
    <LabelTemplate :label-item="inputItem.label" :for="inputItem.uuid" />
  </div>
</template>

<script setup lang="ts">
import LabelTemplate from "../Label/LabelTemplate.vue";
import {PropType} from "vue";
import {Input} from "./Input.ts";

const props = defineProps({
  inputItem: Object as PropType<Input>
})
</script>

<style scoped>

</style>