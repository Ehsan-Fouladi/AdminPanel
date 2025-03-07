<template>
  <div>
    <div class="card">
      <Button class="mb-2">افزودن بنر جدید</Button>
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
              <Button severity="danger" as="router-link" label="حذف" :to="`/banners/edit/${slotProps.data.id}`"/>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {Banner} from "~/models/banners/Banner";
import {getBanners} from "~/services/banner.service";

const banners: Ref<Banner[]> = ref([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  const response = await getBanners()
  isLoading.value = false
  banners.value = response.data ?? [];
})

definePageMeta({
  title: "مدیریت بنر ها"
})
</script>