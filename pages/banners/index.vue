<template>
  <div>
    <div class="card">
      <Button as="router-link" to="/banners/add" class="mb-2">افزودن بنر جدید</Button>
      <DataTable :loading="isLoading" :value="banners" tableStyle="min-width: 50rem">
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img class="w-[200px] rounded" :src="BannerImageUrl(slotProps.data.imageName)" :alt="slotProps.data.image">
          </template>
        </Column>
        <Column field="link" header="لینک">
          <template #body="slotProps">
            <NuxtLink class="text-blue-600" :to="slotProps.data.link" target="_blank" external>لینک بنر</NuxtLink>
          </template>
        </Column>
        <Column field="position" header="مکان قرار گیری در صفحه">
          <template #body="slotProps">
            <p>{{ GetBannerPositionName(slotProps.data.position) }}</p>
          </template>
        </Column>
        <Column field="actions" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-3">
              <Button severity="info" as="router-link" label="ویرایش" :to="`/banners/edit/${slotProps.data.id}`"/>
              <Button @click="openDeleteDialog(slotProps.data.id)" severity="danger" label="حذف"/>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {Banner} from "~/models/banners/Banner";
import {ServiceDeleteBanners, ServiceGetBanners} from "~/services/banner.service";

const banners: Ref<Banner[]> = ref([]);
const isLoading = ref(true);
const showDialog = usePrimeFunctions();
const selectedItem = ref(0);

const deleteFunction = async () => {
  const response = await ServiceDeleteBanners(selectedItem.value);
  if (response.isSuccess) {
    banners.value = banners.value.filter(f => f.id !== selectedItem.value);
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
  const response = await ServiceGetBanners()
  isLoading.value = false
  banners.value = response.data ?? [];
};

definePageMeta({
  title: "مدیریت بنر ها"
})
</script>