<template>
  <div v-if="boardItem && boardItem.item">
    <HeaderTemplate v-if="Header.name === boardItem.item.constructor.name" :header-item="boardItem.item" />
    <InputTemplate v-if="Input.name === boardItem.item.constructor.name" :input-item="boardItem.item" />
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {BoardItem} from "./BoardItem.ts";
import HeaderTemplate from "../Header/HeaderTemplate.vue";
import { Header } from "../Header/Header.ts";
import InputTemplate from "../Input/InputTemplate.vue";
import {Input} from "../Input/Input.ts";

const props = defineProps({
  boardItem: Object as PropType<BoardItem>
})
</script>

<style scoped>

</style>