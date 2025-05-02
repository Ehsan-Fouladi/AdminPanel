<template>
  <div>
    <div class="flex gap-2 sm:flex-col-reverse flex-wrap justify-center">
      <Select class="sm:w-full" v-model="take"
        :options="[{ label: '5', value: 5 }, { label: '10', value: 10 }, { label: '15', value: 15 }, { label: '25', value: 25 }, { label: '35', value: 35 }]"
        optionLabel="label" placeholder="تعداد نمایش" />
      <div class="flex flex-wrap justify-center">
        <div v-if="filterResult.currentPage > 1">
          <Button @click="goFirstPage" text rounded icon="pi pi-angle-double-right" aria-label="doubleRight" />
          <Button @click="prev" text rounded icon="pi pi-angle-right" aria-label="Right" />
        </div>
        <Button @click="currentPageModel = item" v-for="item in generatePages()" :key="item" :label="item.toString()" :severity="item == filterResult.currentPage ? 'green': 'secondary'" :text="item != filterResult.currentPage" rounded aria-label="pageNumber" />
        <div v-if="filterResult.currentPage < filterResult.pageCount">
          <Button @click="goLastPage" text rounded icon="pi pi-angle-double-left" aria-label="doubleLeft" />
          <Button @click="next" text rounded icon="pi pi-angle-left" aria-label="Left" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {FilterResult} from "~/models/FilterResult";

const currentPageModel = defineModel({
  type: Number,
  required: true
});

const emits = defineEmits(['changeTake']);

const { filterResult } = defineProps<{
  filterResult: FilterResult<any>
}>();

const take = ref(
  { label: filterResult.take.toString(), value: filterResult.take }
);

const generatePages = ()=>{
  let pages = [];
  for (let i = filterResult.startPage; i <= filterResult.endPage ; i++) {
    pages.push(i);
  }
  return pages;
};

watch(take, (val)=>{
  emits('changeTake', val.value)
});

const next = ()=>{
  currentPageModel.value += 1;
};

const goLastPage = ()=>{
  currentPageModel.value = filterResult.pageCount;
};

const prev = ()=>{
  currentPageModel.value -= 1
};

const goFirstPage = ()=>{
  currentPageModel.value = 1
};
</script>