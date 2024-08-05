<template>
  <template v-for="crafter of crafterStore.crafterModals">
    <TemplateCrafterModalItem :crafter="crafter as Crafter" />
  </template>
</template>

<script setup lang="ts">
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import TemplateCrafterModalItem from "./TemplateCrafterModalItem.vue";
import {Crafter} from "../TemplateBoard/Crafter.ts";

const crafterStore = useTemplateCrafterStore()

</script>

<style scoped>

</style>