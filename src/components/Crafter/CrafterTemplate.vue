<template>
  <div v-if="crafter" :class="crafter.cssClasses.toString()">
    <div class="c-template-section-header">
      <div class="c-header-info">
        <em><!--Awesome Information--></em>
      </div>
      <div class="c-header-header">
        <template v-for="header of crafter.getContainerItems('header')" :key="header.uuid">
          <ItemTemplate :item="header as BoardItemElement" />
        </template>
      </div>
      <div class="c-header-action"><!--<button>Select Unicorn</button>--></div>
      <div class="c-header-mobile">
  <!--      <button>Infos</button>
        <button>Actions</button>-->
      </div>
    </div>
    <div class="c-template-section-body" v-if="crafter">
      <template v-for="bodyItem of crafter.getContainerItems('body')" :key="bodyItem.uuid">
        <ItemTemplate :item="bodyItem as BoardItemElement" />
      </template>
    </div>
    <div class="c-template-section-body-two-column">
      <div class="c-template-section-body-left" v-if="crafter">
        <template v-for="bodyItem of crafter.getContainerItems('body-left')" :key="bodyItem.uuid">
          <ItemTemplate :item="bodyItem as BoardItemElement" />
        </template>
      </div>
      <div class="c-template-section-body-right" v-if="crafter">
        <template v-for="bodyItem of crafter.getContainerItems('body-right')" :key="bodyItem.uuid">
          <ItemTemplate :item="bodyItem as BoardItemElement" />
        </template>
      </div>
    </div>
    <div class="c-template-section-footer">
      <div class="c-template-footer-left" v-if="crafter">
        <template v-for="footerItem of crafter.getContainerItems('footerLeft')" :key="footerItem.uuid">
          <ItemTemplate :item="footerItem  as BoardItemElement" />
        </template>
      </div>
      <div class="c-template-footer-right" v-if="crafter">
        <template v-for="footerItem of crafter.getContainerItems('footerRight')" :key="footerItem.uuid">
          <ItemTemplate :item="footerItem as BoardItemElement" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import { Crafter} from "./Crafter.ts";
import HeaderTemplate from "../Header/HeaderTemplate.vue";
import ItemTemplate from "./ItemTemplate.vue";
import {BoardItemElement} from "../Interfaces";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

const props = defineProps({
  crafter: Object as PropType<Crafter>
})

const crafterStore = useTemplateCrafterStore();
</script>

<style scoped>

</style>