<template>
  <div :class="crafterStore.styleSetting.cssDefaultClass.modalBackground" @click="backgroundClickEvent">
    <div :class="crafter?.modalCssClasses.toString()" :style="'max-width: '+ crafter?.modalMaxWidth+';'">
      <CrafterTemplate :crafter="crafter" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {PropType} from "vue";
  import {Crafter} from "../TemplateBoard/Crafter.ts";
  import CrafterTemplate from "../TemplateBoard/CrafterTemplate.vue";
  import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

  const props = defineProps({
    crafter: Object as PropType<Crafter>
  })

  const crafterStore = useTemplateCrafterStore()

  function backgroundClickEvent() {
    if(!props.crafter) return

    /// ToDo: More possible events. Via Crafter Class

    if(props.crafter.isBackgroundCloseEnabled) {
      crafterStore.removeCrafterModal(props.crafter)
    }
  }
</script>

<style scoped>

</style>