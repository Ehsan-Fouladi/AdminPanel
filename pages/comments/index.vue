<template>
  <div>
    <div class="card">
      <DataTable :value="comments" tableStyle="min-width: 50rem">
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
        <Column field="actions" header="عملیات">
          <template #body="slotProps">
            <div class="flex gap-3">
              <Button @click="openDialog(slotProps.data)" size="small" severity="info" label="نمایش"/>
              <Button size="small" severity="danger" label="حذف"/>
            </div>
          </template>
        </Column>
        <template #footer>
          <div class="w-full flex justify-center items-center">
            <BasePagination/>
          </div>
        </template>
      </DataTable>
    </div>
    <Dialog modal v-model:visible="isOpenDialog" style="width: 760px;">
      <template #header>
        <h5 class="text-2xl font-bold">مشاهده دیدگاه
          <span class="text-green-600 text-sm mr-1" v-if="selectedComment?.status == CommentStatus.Accepted">تایید شده</span>
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
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {ServiceGetComment} from "~/services/comment.service";
import {type Comment, type CommentFilterParams, CommentStatus} from "~/models/comments/Comment";

const comments: Ref<Comment[]> = ref([]);
const loading = ref(false);
const isOpenDialog = ref(false);
const selectedComment: Ref<Comment | null> = ref(null);

const filterParams = reactive<CommentFilterParams>({
  commentStatus: undefined,
  pageId: 1,
  take: 10,
  productId: undefined,
  userId: undefined
});

onMounted(async ()=>{
  loading.value = true;
  const result = await ServiceGetComment(filterParams);
  if (result.isSuccess) {
    comments.value = result.data.data ?? [];
  }
});

const openDialog = (comment:any) => {
  selectedComment.value = comment;
  isOpenDialog.value = true;
}

definePageMeta({
  title: "مدیریت نظرات"
})
</script>