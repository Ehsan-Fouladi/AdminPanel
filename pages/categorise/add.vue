<template>
  <div class="card-body">
    <Form :validation-schema="schema" @submit="submited">
      <div class="flex sm:flex-wrap gap-3">
        <BaseInputText v-model="data.title" class="w-1/2 sm:w-full" label="عنوان دسته بندی" type="text" name="title"/>
        <BaseInputText v-model="data.slug" class="w-1/2 sm:w-full" label="slug" type="text" name="slug"/>
      </div>
      <hr class="my-5">
      <BaseSeoDataForm v-model="data.seoData"/>
      <BaseUploadFile v-model="data.imageFile"/>
      <Button :loading="isLoading" type="submit" label="ثبت دسته بندی" class="mt-4"/>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import {Form} from "vee-validate";
import * as Yup from "yup"
import type {CreateCategory} from "~/models/categorise/CreateCategory";
import {ServiceAddChildCategory, ServiceCreateCategory} from "~/services/category.service";

const isLoading = ref(false);
const toast = useToast();
const route = useRoute();
const parentId = route.query.parentId ?? undefined;

const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان"),
  slug: Yup.string().required().label("slug")
})

const data = reactive<CreateCategory>({
  slug: "",
  title: "",
  imageFile: null,
  seoData: {
    canonical: "",
    indexPage: 'true',
    metaDescription: "",
    metaKeyWords: "",
    metaTitle: ""
  },
  parentId: undefined
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
  if (parentId) {
    data.parentId = Number(parentId);
    const childResponse = await ServiceAddChildCategory(data)
    if (childResponse.isSuccess) {
      toast.add({
        summary: "عملیات با موفقیت انجام شد",
        severity: "success",
        life: 4000
      });
      navigateTo("/categorise", {open: {target: "_self"}})
    }
  } else {
    const response = await ServiceCreateCategory(data)
    if (response.isSuccess) {
      toast.add({
        summary: "عملیات با موفقیت انجام شد",
        severity: "success",
        life: 4000
      });
      navigateTo("/categorise", {open: {target: "_self"}})
    }
  }
  isLoading.value = false
}

definePageMeta({
  title: "افزودن دسته بندی"
})

onMounted(() => {
  route.meta.title = parentId ? "افزودن زیر دسته بندی" : "افزودن دسته بندی"
})
</script>