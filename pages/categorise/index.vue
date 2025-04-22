<template>
  <div>
    <div class="card">
      <Button as="router-link" to="/categorise/add" class="mb-2">افزودن دسته بندی جدید</Button>
      <DataTable :loading="isLoading" :value="data" tableStyle="min-width: 50rem">
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img class="w-[200px] rounded" :src="CategoryImageUrl(slotProps.data.imageName)"
                 :alt="slotProps.data.title">
          </template>
        </Column>
        <Column field="title" header="عنوان"/>
        <Column field="slug" header="slug"/>
        <Column field="childs" header="زیر گروه ها">
          <template #body="slotProps">
            <div class="flex items-center gap-2 mt-2" v-for="item in slotProps.data.childs" :key="item.id">
              <div class="w-[5px] h-[5px] bg-black rounded-full"></div>
              <p>{{ item.title }}</p>
              <Button size="small" severity="info" as="router-link" label="ویرایش"
                      :to="`/categorise/edit?id=${item.id}`"/>
              <Button size="small" @click="openDeleteDialog(item.id)" severity="danger" label="حذف"/>
            </div>
          </template>
        </Column>
        <Column field="actions" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-3">
              <Button size="small" as="router-link" label="افزودن زیر گروه"
                      :to="`/categorise/add?parentId=${slotProps.data.id}`"/>
              <Button size="small" severity="info" as="router-link" label="ویرایش"
                      :to="`/categorise/edit?id=${slotProps.data.id}`"/>
              <Button size="small" @click="openDeleteDialog(slotProps.data.id)" severity="danger" label="حذف"/>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {Category} from "~/models/categorise/Category";
import {CategoryImageUrl} from "~/utils/imagePath";
import {ServiceDeleteCategorise, ServiceGetCategorise} from "~/services/category.service";

const data: Ref<Category[]> = ref([]);
const isLoading = ref(true);
const showDialog = usePrimeFunctions();
const selectedItem = ref(0);

const deleteFunction = async () => {
  const response = await ServiceDeleteCategorise(selectedItem.value);
  if (response.isSuccess) {
    await getData()
    selectedItem.value = 0;
    showDialog.successToast();
  }
};

const openDeleteDialog = async (id: number) => {
  selectedItem.value = id;
  showDialog.deleteDialog(undefined, undefined, deleteFunction);
};

onMounted(async () => {
  await getData()
});

const getData = async () => {
  isLoading.value = true
  const response = await ServiceGetCategorise()
  isLoading.value = false
  data.value = response.data ?? [];
};

definePageMeta({
  title: "مدیریت دسته بندی ها"
})
</script>