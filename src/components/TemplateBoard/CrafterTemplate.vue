<template>
  <div class="c-template-wrapper-header" v-if="crafter">
    <div class="c-header-info"><em>Awesome Information</em></div>
    <div class="c-header-header">
      <template v-for="header of crafter.headerItems" :key="header.uuid">
        <HeaderTemplate :header-item="header" />
      </template>

    </div>
    <div class="c-header-action"><button>Select Unicorn</button></div>
    <div class="c-header-mobile">
      <button>Infos</button>
      <button>Actions</button>
    </div>
  </div>
  <div class="c-template-wrapper-body" v-if="crafter">
    <div v-for="bodyItem of crafter.bodyItems" :key="bodyItem.uuid" :style="'width: '+bodyItem.flexSize.currentSize.value+';'">
      <InputTemplate v-if="Input.name === bodyItem.constructor.name"  :input-item="bodyItem" />
    </div>
  </div>
  <div class="c-template-wrapper-footer">
    <div class="c-template-footer-left">
      <button>Kill unicorn</button>
    </div>
    <div class="c-template-footer-right">
      <button>Feed unicorn</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import { Crafter} from "./Crafter.ts";
import InputTemplate from "../Input/InputTemplate.vue";
import {Input} from "../Input/Input.ts";
import HeaderTemplate from "../Header/HeaderTemplate.vue";

const props = defineProps({
  crafter: Object as PropType<Crafter>
})
const nameInput = new Input("Name")
nameInput.cssClasses.addClass("c-col-6")
const colorInput = new Input("Color of unicorn")
const ageInput = new Input("Age")
const speedInput = new Input("Maximum Speed")
</script>

<style scoped>

</style>