<script setup lang="ts">
import type {SeoData} from "~/models/SeoData";

const model = defineModel<SeoData>({required: true})
</script>
<template>
  <div class="flex flex-wrap justify-between">
    <div class="w-1/2 sm:w-full p-2">
      <BaseInputText name="metaTitle" v-model="model.metaTitle" label="metaTitle"/>
    </div>
    <div class="w-1/2 sm:w-full p-2">
      <BaseInputText name="metaDescription" v-model="model.metaDescription" label="metaDescription"/>
    </div>
    <div class="w-1/2 sm:w-full p-2">
      <BaseInputText name="metaKeyWords" v-model="model.metaKeyWords" label="metaKeyWords"/>
    </div>
    <div class="w-1/2 sm:w-full p-2">
      <BaseInputText type="url" name="canonical" v-model="model.canonical" label="canonical"/>
    </div>
    <div class="w-full p-2">
      <BaseSelectBox v-model="model.indexPage" name="indexPage" label="indexPage"
                     :options="[{ name: 'بله', value: 'true' }, { name: 'خیر', value: 'false' }]"/>
    </div>
  </div>
</template>