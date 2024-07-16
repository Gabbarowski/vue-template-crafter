<template>
  <div v-if="crafter" class="">
    <div v-for="row of crafter.rows" class="c-grid">
      <div v-for="col of row.boardItems" class="c-col">
        <BoardItemTemplate :boardItem="col" />
      </div>
    </div>
  </div>

  <div class="c-template-wrapper-header">
    <div class="c-header-info"><em>Awesome Information</em></div>
    <div class="c-header-header"><h3>My Unicorn is beautiful</h3></div>
    <div class="c-header-action"><button>Select Unicorn</button></div>
    <div class="c-header-mobile">
      <button>Infos</button>
      <button>Actions</button>
    </div>
  </div>
  <div class="c-template-wrapper-body">
    <div class="c-col-6">
      <label>Name</label>
      <input class="c-input"  />
    </div>
    <button>Name generator</button>
    <InputTemplate :input-item="colorInput" />
    <button>Color Picker</button>
    <InputTemplate :input-item="ageInput" />
    <InputTemplate :input-item="speedInput" />
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
import BoardItemTemplate from "./BoardItemTemplate.vue";
import InputTemplate from "../Input/InputTemplate.vue";
import {Input} from "../Input/Input.ts";
import LabelTemplate from "../Label/LabelTemplate.vue";

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