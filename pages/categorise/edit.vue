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
import type {EditCategory} from "~/models/categorise/CreateCategory";
import {ServiceGetByIdCategorise, ServiceUpdateCategory} from "~/services/category.service";

const isLoading = ref(true);
const toast = useToast();
const showDialog = usePrimeFunctions();
const route = useRoute();
const id = route.query.id ?? undefined;

const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان"),
  slug: Yup.string().required().label("slug")
})

const data = reactive<EditCategory>({
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
  id: 0
})

onMounted(async ()=>{
  isLoading.value = true;
  const category = await ServiceGetByIdCategorise(+id!);
  if (category.isSuccess){
    data.seoData = category.data.seoData;
    data.slug = category.data.slug;
    data.title = category.data.title;
  }else {
    toast.add({
      summary: "دسته بندی مورد نظر یافت نشد.",
      severity: "warn",
      life: 2000,
    })
    navigateTo("/categorise", {open: {target: "_self"}})
  }
  isLoading.value = false;
})

const submited = async () => {
  isLoading.value = true
  data.id = Number(id);
  const response = await ServiceUpdateCategory(data)
  if (response.isSuccess) {
    toast.add({
      summary: "عملیات با موفقیت انجام شد",
      severity: "success",
      life: 4000
    });
    navigateTo("/categorise", {open: {target: "_self"}})
  }
  isLoading.value = false
}

definePageMeta({
  title: "ویراایش دسته بندی"
})
</script>