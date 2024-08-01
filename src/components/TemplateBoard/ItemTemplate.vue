<template >
  <InputTemplate v-if="item && Input.name === item.constructor.name"  :input-item="item as Input" />
  <template v-if="item && Button.name === item.constructor.name" >
    <ButtonTemplate :buttonItem="item as Button" />
  </template>
</template>

<script setup lang="ts">
import {Input} from "../Input/Input.ts";
import {Button} from "../Button/Button.ts";
import ButtonTemplate from "../Button/ButtonTemplate.vue";
import InputTemplate from "../Input/InputTemplate.vue";
import {PropType} from "vue";
import {BoardItemElement} from "../Utility/Interfaces.ts";

const props = defineProps({
  item: Object as PropType<BoardItemElement>
})
</script>