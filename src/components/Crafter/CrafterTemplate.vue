<template>
  <div :class="crafterStore.styleSetting.cssDefaultClass.crafterWrapper">
    <div class="c-template-wrapper-header" v-if="crafter">
      <div class="c-header-info">
        <em><!--Awesome Information--></em>
      </div>
      <div class="c-header-header">
        <template v-for="header of crafter.headerItems" :key="header.uuid">
          <HeaderTemplate :header-item="header" />
        </template>
      </div>
      <div class="c-header-action"><!--<button>Select Unicorn</button>--></div>
      <div class="c-header-mobile">
  <!--      <button>Infos</button>
        <button>Actions</button>-->
      </div>
    </div>
    <div class="c-template-wrapper-body" v-if="crafter">
      <template v-for="bodyItem of crafter.bodyItems" :key="bodyItem.uuid">
        <ItemTemplate :item="bodyItem as BoardItemElement" />
      </template>
    </div>
    <div class="c-template-wrapper-footer">
      <div class="c-template-footer-left" v-if="crafter">
        <template v-for="footerItem of crafter.footerLeftItems" :key="footerItem.uuid">
          <ItemTemplate :item="footerItem  as BoardItemElement" />
        </template>
      </div>
      <div class="c-template-footer-right" v-if="crafter">
        <template v-for="footerItem of crafter.footerRightItems" :key="footerItem.uuid">
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