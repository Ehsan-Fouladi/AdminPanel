<template>
  <div class="space-y-2">
    <table>
      <thead>
      <tr>
        <th>عنوان</th>
        <th>مقدار</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in rowCount">
        <td>
          <BaseInputText :name="`t-${item}`" placeholder="عنوان"/>
        </td>
        <td>
          <BaseInputText :name="`v-${item}`" placeholder="مقدار"/>
        </td>
      </tr>
      </tbody>
    </table>
    <Button @click="add">افزودن رکورد جدید</Button>
  </div>
</template>
<script setup lang="ts">
const rowCount = ref([1]);
const emit = defineEmits(['rowCount'])

const add = () => {
  let last = rowCount.value[rowCount.value.length - 1];
  rowCount.value.push(last + 1);
  emit('rowCount', last + 1)
}
</script>
<style scoped>
table {
  border: 1px solid;
  border-color: #bcccdc;
  border-radius: 8px;
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: white;
}

thead {
  border-bottom: 1px solid;
  border-color: #bcccdc;
}

td, th {
  border: 1px solid;
  border-color: #bcccdc;
  padding: 1rem;
  text-align: center;
}
</style>