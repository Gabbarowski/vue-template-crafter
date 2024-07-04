<script setup lang="ts">

import {Form} from "./Form/Entity/Form.ts";
import {ref} from "vue";
import {useFormStore} from "./Form/formStore.ts";

const test = ref<Form>(new Form())

const store = useFormStore();

function alertTest() {
  store.test()
}
</script>

<template>
<div>
  <h1>My Test</h1>
  <button class="button" @click="alertTest">Test</button>
  {{store.forms}} Hey
</div>
</template>

<style scoped>

</style>