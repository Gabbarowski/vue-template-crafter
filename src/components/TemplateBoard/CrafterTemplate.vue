<template>
  <div v-if="crafter" class="">
    <div v-for="row of crafter.rows" class="c-grid">
      <div v-for="col of row.boardItems" class="c-col">
        <BoardItemTemplate :boardItem="col" />
      </div>
    </div>
  </div>

  <div class="c-container-default">
    <div class="c-row">
      <div class="c-col-1">Col-1</div>
      <div class="c-col-1">Col-1</div>
      <div class="c-col-1">Col-1</div>
      <div class="c-col-1">Col-1</div>
      <div class="c-col-1">Col-1</div>
      <div class="c-col-1">Col-1</div>
    </div>
    <div class="c-row">
      <div class="c-col-2">Col-2</div>
      <div class="c-col-2">Col-2</div>
      <div class="c-col-2">Col-2</div>
    </div>
    <div class="c-row">
      <div class="c-col-3">Col-3</div>
      <div class="c-col-3">Col-3</div>
    </div>
    <div class="c-row">
      <div class="c-col-6">Col-6</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import { Crafter} from "./Crafter.ts";
import BoardItemTemplate from "./BoardItemTemplate.vue";

const props = defineProps({
  crafter: Object as PropType<Crafter>
})
</script>

<style scoped>

</style>