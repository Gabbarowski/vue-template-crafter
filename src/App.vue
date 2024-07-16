<script setup lang="ts">
import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";

const crafter = new Crafter()

</script>

<template>
  <div>
    <CrafterTemplate :crafter="crafter" />
  </div>
</template>

<style >
@import "style.scss";

</style>
