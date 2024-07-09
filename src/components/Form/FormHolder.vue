<template>
  <div v-if="formItem">
    <Header :header-item="formItem.header" />
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Form} from "./Form.ts";
import Header from "../Header/HeaderTemplate.vue";

const props = defineProps({
  formItem: Object as PropType<Form>
})

</script>

<style scoped>

</style>