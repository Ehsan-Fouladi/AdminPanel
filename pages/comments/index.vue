<template>
  <div>
    <div class="card">
      <DataTable :loading="loading" :value="comments?.data" tableStyle="min-width: 50rem">
        <Column field="userFullName" header="نام و نام خانوادگی"></Column>
        <Column field="productTitle" header="محصول"></Column>
        <Column field="rate" header="امتیاز"></Column>
        <Column field="userRecommendedStatus" header="وضعیت پیشنهاد">
          <template #body="slotProps">
            <p :class="[
                {'text-red-600': slotProps.data.userRecommendedStatus === 1},
                {'text-green-600': slotProps.data.userRecommendedStatus === 0},
                {'text-yellow-600': slotProps.data.userRecommendedStatus === 2},
            ]">{{ GetUserRecommendStatusName(slotProps.data.userRecommendedStatus) }}</p>
          </template>
        </Column>
        <Column field="status" header="وضعیت">
          <template #body="slotProps">
            <span class="text-green-600 text-sm mr-1"
                  v-if="slotProps.data?.status == CommentStatus.Accepted">تایید شده</span>
            <span class="text-orange-600 text-sm mr-1" v-else-if="slotProps.data?.status == CommentStatus.Pending">در انتظار تایید</span>
            <span class="text-red-600 text-sm mr-1" v-else>رد شده</span>
          </template>
        </Column>
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
    <Dialog modal v-model:visible="isOpenDialog" style="width: 760px;">
      <template #header>
        <h5 class="text-2xl font-bold">مشاهده دیدگاه
          <span class="text-green-600 text-sm mr-1"
                v-if="selectedComment?.status == CommentStatus.Accepted">تایید شده</span>
          <span class="text-orange-600 text-sm mr-1" v-else-if="selectedComment?.status == CommentStatus.Pending">در انتظار تایید</span>
          <span class="text-red-600 text-sm mr-1" v-else>رد شده</span>
        </h5>
      </template>
      <div>
        <div class="flex flex-wrap justify-between gap-3">
          <p class="w-[45%]"><b>نام و نام خانوادگی</b>: {{ selectedComment?.userFullName }}</p>
          <p class="w-[45%]"><b>محصول</b>: {{ selectedComment?.productTitle }}</p>
          <p class="w-[45%]"><b>امتیاز</b>: {{ selectedComment?.rate }}</p>
          <p class="w-[45%]"><b>وضعیت پیشنهاد</b>:
            <span :class="[
                {'text-red-600': selectedComment!.userRecommendedStatus === 1},
                {'text-green-600': selectedComment!.userRecommendedStatus === 0},
                {'text-yellow-600': selectedComment!.userRecommendedStatus === 2}]">
            {{ GetUserRecommendStatusName(selectedComment!.userRecommendedStatus) }}
          </span>
          </p>
          <p class="w-[45%]"><b>نقاط قوت</b>:
            <span class="text-green-600">{{ selectedComment?.advantages.join(" - ").toString() }}</span>
          </p>
          <p class="w-[45%]"><b>نقاط ضعف</b>:
            <span class="text-red-600">{{ selectedComment?.disadvantages.join(" - ").toString() }}</span>
          </p>
        </div>
        <hr class="my-5">
        <p class="w-full"><b>متن نظر</b>: {{ selectedComment?.text }}</p>
        <hr class="my-5">
        <p>تغییر وضعیت نظر</p>
        <BaseSelectBox name="changeStatus" v-model="selectedStatus" :options="[
            {name: 'در انتظار تایید', value: CommentStatus.Pending.toString()},
            {name: 'رد شده', value: CommentStatus.Rejected.toString()},
            {name: 'تایید شده', value: CommentStatus.Accepted.toString()},
            ]"/>
        <div class="flex justify-end mt-4">
          <Button @click="changeStatus" label="ثبت تغییرات"/>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {ServiceChangeStatusComment, ServiceDeleteComment, ServiceGetComment} from "~/services/comment.service";
import {type Comment, type CommentFilterParams, CommentStatus} from "~/models/comments/Comment";
import type {FilterResult} from "~/models/FilterResult";

const showDialog = usePrimeFunctions();
const comments: Ref<FilterResult<Comment> | null> = ref(null);
const selectedComment: Ref<Comment | null> = ref(null);
const loading = ref(false);
const isOpenDialog = ref(false);
const selectedStatus = ref(CommentStatus.Accepted.toString());

const filterParams = reactive<CommentFilterParams>({
  commentStatus: undefined,
  pageId: 1,
  take: 10,
  productId: undefined,
  userId: undefined
});

onMounted(() => {
  getData();
});

const openDeleteDialog = (comment: Comment) => {
  selectedComment.value = comment;
  showDialog.deleteDialog(undefined, undefined, deleteComment);
};

const deleteComment = async () => {
  if (selectedComment.value) {
    const result = await ServiceDeleteComment(selectedComment.value.id);
    if (result.isSuccess) {
      getData();
    }
  }
};

const getData = async () => {
  loading.value = true;
  const result = await ServiceGetComment(filterParams);
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
  selectedComment.value = comment;
  selectedStatus.value = comment.status.toString();
  isOpenDialog.value = true;
};

const changeStatus = async () => {
  if (selectedComment.value) {
    const selected = Number(selectedStatus.value)
    const result = await ServiceChangeStatusComment(selectedComment.value.id, selected);
    if (result.isSuccess) {
      selectedComment.value.status = selected
      showDialog.successToast();
    }
  }
}

definePageMeta({
  title: "مدیریت نظرات"
});
</script>