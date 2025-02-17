<template>
  <div>
    <div class="flex sm:flex-col-reverse flex-wrap justify-center">
      <Select class="sm:w-full" v-model="take"
        :options="[{ label: '5', value: 5 }, { label: '10', value: 10 }, { label: '15', value: 15 }, { label: '25', value: 25 }, { label: '35', value: 35 }]"
        optionLabel="label" placeholder="تعداد نمایش" />
      <div class="flex flex-wrap justify-center">
        <div>
          <Button text rounded icon="pi pi-angle-double-right" aria-label="doubleRight" />
          <Button text rounded icon="pi pi-angle-right" aria-label="Right" />
        </div>
        <Button v-for="item in 5" :key="item" :label="item.toString()" severity="secondary" text
          aria-label="pageNumber" />
        <div>
          <Button text rounded icon="pi pi-angle-double-left" aria-label="doubleLeft" />
          <Button text rounded icon="pi pi-angle-left" aria-label="Left" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const take = ref(
  { label: '15', value: 15 }
)
</script>