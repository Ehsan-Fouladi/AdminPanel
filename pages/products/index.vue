<template>
  <div>
    <div class="card">
      <DataTable :loading="loading" :value="comments?.data" tableStyle="min-width: 50rem">
        <Column field="id" header="id"></Column>
        <Column field="imageName" header="عکس">
          <template #body="slotProps">
            <img class="size-28 object-cover rounded-md" :src="ProductImageUrl(slotProps.data.imageName)" :alt="slotProps.data.title" draggable="false" loading="lazy">
          </template>
        </Column>
        <Column field="title" header="عنوان"></Column>
        <Column field="slug" header="عنوان انگلیسی"></Column>
        <Column field="actions" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-3">
              <Button @click="openDialog(slotProps.data)" size="small" severity="info" label="نمایش"/>
              <Button @click="openDeleteDialog(slotProps.data)" size="small" severity="danger" label="حذف"/>
            </div>
          </template>
        </Column>
        <template #footer>
          <div class="w-full flex justify-center items-center">
            <BasePagination v-model="filterParams.pageId" v-if="comments"
                            :filter-result="comments" @changeTake="changeTake"/>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ProductFilterItem, ProductFilterParams} from "~/models/products/ProductFilterItem";
import type {FilterResult} from "~/models/FilterResult";
import {ServiceGetProductsByFilter} from "~/services/product.service";

const showDialog = usePrimeFunctions();
const comments: Ref<FilterResult<ProductFilterItem> | null> = ref(null);
const selectedComment: Ref<ProductFilterItem | null> = ref(null);
const loading = ref(false);
const isOpenDialog = ref(false);
// const selectedStatus = ref(CommentStatus.Accepted.toString());

const filterParams = reactive<ProductFilterParams>({
  pageId: 1,
  take: 10,
  id: undefined,
  slug: undefined,
  title: undefined
});

onMounted(() => {
  getData();
});

const openDeleteDialog = (comment: ProductFilterItem) => {
  selectedComment.value = comment;
  showDialog.deleteDialog(undefined, undefined, deleteComment);
};

const deleteComment = async () => {
  // if (selectedComment.value) {
  //   const result = await ServiceDeleteComment(selectedComment.value.id);
  //   if (result.isSuccess) {
  //     getData();
  //   }
  // }
};

const getData = async () => {
  loading.value = true;
  const result = await ServiceGetProductsByFilter(filterParams);
  if (result.isSuccess) {
    comments.value = result.data;
  }
  loading.value = false;
};

watch(filterParams, () => {
  getData();
});

const changeTake = (newTake: number) => {
  filterParams.pageId = 1;
  filterParams.take = newTake;
};

const openDialog = (comment: any) => {
  // selectedComment.value = comment;
  // selectedStatus.value = comment.status.toString();
  // isOpenDialog.value = true;
};

const changeStatus = async () => {
  // if (selectedComment.value) {
  //   const selected = Number(selectedStatus.value)
  //   const result = await ServiceChangeStatusComment(selectedComment.value.id, selected);
  //   if (result.isSuccess) {
  //     selectedComment.value.status = selected
  //     showDialog.successToast();
  //   }
  // }
}

definePageMeta({
  title: "مدیریت محصولات"
});
</script>