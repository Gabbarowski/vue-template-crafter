<template >
  <InputTemplate v-if="item && Input.name === item.constructor.name"  :input-item="item as Input" />
  <template v-if="item && Button.name === item.constructor.name" >
    <ButtonTemplate :buttonItem="item as Button" />
  </template>
  <template v-if="item && Textbox.name === item.constructor.name" >
    <TextboxTemplate :textbox="item as Textbox" />
  </template>

  <template v-if="item && Checkbox.name === item.constructor.name" >
    <CheckboxTemplate :checkbox="item as Checkbox" />
  </template>
</template>

<script setup lang="ts">
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import ButtonTemplate from "../Button/ButtonTemplate.vue";
import InputTemplate from "../Input/InputWrapperTemplate.vue";
import {PropType} from "vue";
import {BoardItemElement} from "../Interfaces";
import {Textbox} from "../Textbox/Textbox.ts";
import TextboxTemplate from "../Textbox/TextboxTemplate.vue";
import {Checkbox} from "../Checkbox/Checkbox";
import CheckboxTemplate from "../Checkbox/CheckboxTemplate.vue";

const props = defineProps({
  item: Object as PropType<BoardItemElement>
})
</script>