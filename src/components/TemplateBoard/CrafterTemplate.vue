<template>
  <div v-if="crafter">
    <div v-for="row of crafter.rows">
      <div v-for="col of row.boardItems">
        <BoardItemTemplate :boardItem="col" />
      </div>
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