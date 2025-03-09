<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex gap-3">
        <BaseInputText v-model="data.link" class="w-1/2" label="آدرس اینترنتی" type="url" name="url"/>
        <BaseSelectBox v-model="data.position" class="w-1/2" label="مکان قرار گیری" name="position"
                       :options="positions"/>
      </div>
      <BaseUploadFile v-model="data.imageFile" />
      <Button :loading="isLoading" type="submit" label="ثبت بنر" class="mt-4" />
    </Form>
  </div>
</template>
<script lang="ts" setup>
import {Form} from "vee-validate";
import * as Yup from "yup"
import {ServiceCreateBanner} from "~/services/banner.service";
import type {CreateBanner} from "~/models/banners/CreateBanner";
import {BannerPosition} from "~/models/banners/Banner";

const isLoading = ref(false)
const toast = useToast()

const schema = Yup.object().shape({
  url: Yup.string().required().url().label("آدرس اینترنتی"),
  position: Yup.string().required().label("مکان قرار گیری")
})

const positions = ref([
  {name: GetBannerPositionName(BannerPosition.بالای_اسلایدر), value: BannerPosition.بالای_اسلایدر},
  {name: GetBannerPositionName(BannerPosition.وسط_صفحه), value: BannerPosition.وسط_صفحه},
  {name: GetBannerPositionName(BannerPosition.زیر_اسلایدر), value: BannerPosition.زیر_اسلایدر},
  {name: GetBannerPositionName(BannerPosition.سمت_چپ_اسلایدر), value: BannerPosition.سمت_چپ_اسلایدر},
  {name: GetBannerPositionName(BannerPosition.سمت_راست_شگفت_انگیز), value: BannerPosition.سمت_راست_شگفت_انگیز}
])

const data = reactive<CreateBanner>({
  link: "",
  imageFile: null,
  position: BannerPosition.بالای_اسلایدر
})

const submited = async () => {
  if (!data.imageFile) {
    toast.add({
      summary: "عکس را انتخاب کنید",
      severity: "error",
      life: 4000
    });
    return;
  }
  isLoading.value = true
  const response = await ServiceCreateBanner(data)
  if (response.isSuccess) {
    toast.add({
      summary: "عملیات با موفقیت انجام شد",
      severity: "success",
      life: 4000
    });
    navigateTo("/banners", {open: {target: "_self"}})
  }
  isLoading.value = false
}

definePageMeta({
  title: "افزودن بنر"
})
</script>
<style scoped>
.card-body {
  @apply bg-white p-5 rounded
}
</style>