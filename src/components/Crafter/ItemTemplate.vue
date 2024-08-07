<template >
  <HeaderTemplate v-if="item && Header.name === item.constructor.name" :header-item="item as Header" />
  <InputTemplate v-if="item && Input.name === item.constructor.name"  :input-item="item as Input" />
  <ButtonTemplate v-if="item && Button.name === item.constructor.name"  :buttonItem="item as Button" />
  <TextboxTemplate v-if="item && Textbox.name === item.constructor.name" :textbox="item as Textbox" />
  <CheckboxTemplate v-if="item && Checkbox.name === item.constructor.name" :checkbox="item as Checkbox" />
  <SelectTemplate v-if="item && Select.name === item.constructor.name" :selectItem="item as Select" />
  <RadioButtonTemplate v-if="item && RadioButton.name === item.constructor.name" :radio-button-item="item as RadioButton" />
</template>

<script setup lang="ts">
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import ButtonTemplate from "../Button/ButtonTemplate.vue";
import InputTemplate from "../Input/InputContainerTemplate.vue";
import {PropType} from "vue";
import {BoardItemElement} from "../Interfaces";
import {Textbox} from "../Textbox/Textbox.ts";
import TextboxTemplate from "../Textbox/TextboxTemplate.vue";
import {Checkbox} from "../Checkbox/Checkbox";
import CheckboxTemplate from "../Checkbox/CheckboxTemplate.vue";
import HeaderTemplate from "../Header/HeaderTemplate.vue";
import {Header} from "../Header/Header.ts";
import RadioButtonTemplate from "../RadioButton/RadioButtonTemplate.vue";
import {RadioButton} from "../RadioButton/RadioButton.ts";
import SelectTemplate from "../Select/SelectTemplate.vue";
import {Select} from "../Select/Select.ts";

const props = defineProps({
  item: Object as PropType<BoardItemElement>
})
</script>