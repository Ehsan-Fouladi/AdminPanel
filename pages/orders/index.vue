<template>
  <div class="card">
    <DataTable :loading="isLoading" :value="orderFilterResult?.data">
      <Column field="id" header="#"></Column>
      <Column field="userFullName" header="نام و نام خانوادگی"></Column>
      <Column field="shire" header="استان - شهر">
        <template #body="slotProps">
          <p>{{ slotProps.data.shire }} - {{ slotProps.data.city }}</p>
        </template>
      </Column>
      <Column field="totalItemCount" header="تعداد محصولات"></Column>
      <Column field="shippingType" header="روش ارسال"></Column>
      <Column field="totalPrice" header="قیمت">
        <template #body="slotProps">
          <p>{{ slotProps.data.totalPrice.toLocaleString() }} تومان</p>
        </template>
      </Column>
      <Column field="status" header="وضعیت">
        <template #body="slotProps">
          <p :class="[
                {'text-red-600': slotProps.data.status === 2},
                {'text-green-600': slotProps.data.status === 1},
                {'text-yellow-600': slotProps.data.status === 0},
            ]">{{ GetOrderStatusName(slotProps.data.status) }}</p>
        </template>
      </Column>
      <Column field="actions" header="عملیات">
        <template #body="slotProps">
          <div class="flex gap-3">
<!--            <Button @click="openDialog(slotProps.data)" size="small" severity="info" label="نمایش"/>-->
<!--            <Button @click="openDeleteDialog(slotProps.data)" size="small" severity="danger" label="حذف"/>-->
          </div>
        </template>
      </Column>
      <template #footer>
        <div class="w-full flex justify-center items-center">
          <BasePagination v-model="filterParams.pageId" v-if="orderFilterResult"
                          :filter-result="orderFilterResult" @changeTake="changeTake"/>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import type {FilterResult} from "~/models/FilterResult";
import type {OrderFilterParams, OrderListData} from "~/models/order/orderListData";
import {ServiceGetOrder} from "~/services/order.service";
import {CommentStatus} from "~/models/comments/Comment";
import {GetOrderStatusName} from "~/utils/EnumConvertor";

const orderFilterResult: Ref<FilterResult<OrderListData> | null> = ref(null);
const isLoading = ref(false);
const filterParams = reactive<OrderFilterParams>({
  pageId: 1,
  take: 10,
  status: undefined,
  userId: undefined,
  startDate: undefined,
  endDate: undefined,
})

onMounted(() => {
  getData();
})

definePageMeta({
  title: "مدیریت سفارشات"
});

const getData = async () => {
  isLoading.value = true;
  const result = await ServiceGetOrder(filterParams);
  orderFilterResult.value = result.data;
  isLoading.value = false;
}

watch(filterParams, () => {
  getData();
});

const changeTake = (newTake: number) => {
  filterParams.pageId = 1;
  filterParams.take = newTake;
};
</script>