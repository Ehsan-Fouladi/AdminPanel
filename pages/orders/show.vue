<template>
  <div v-if="data?.data">
    <h3 class="mt-5 mb-2 font-bold text-xl">اطلاعات سفارش</h3>
    <div class="card-body">
      <div class="flex flex-wrap justify-between gap-2">
        <p> نام و نام خانوادگی: <b>{{ data.data.userFullName }}</b></p>
        <p> وضعیت سفارش: <b :class="[
                {'text-red-600': data.data.status === 2},
                {'text-green-600': data.data.status === 1},
                {'text-yellow-600': data.data.status === 0},
            ]">{{ GetOrderStatusName(data.data.status) }}</b></p>
      </div>
      <div class="flex flex-wrap justify-between gap-2 pt-10">
        <p> مبلغ سفارش: <b>{{ data.data.totalPrice.toLocaleString() }} تومان</b></p>
        <p v-if="data.data.discount"> مبلغ تخفیف: <b>{{ data.data.discount.discountAmount.toLocaleString() }} تومان -
          {{ data.data.discount.discountTitle }}</b></p>
        <p> هزینه پست: <b>{{ (data.data.shippingMethod?.shippingCost.toLocaleString() ?? 0) }} تومان</b></p>
        <p> نوع ارسال: <b>{{ data.data.shippingMethod.shippingType }}</b></p>
      </div>
      <div class="flex flex-wrap justify-between gap-2 pt-10">
        <p> زمان ثبت سفارش: <b>{{ toPersianDate(new Date(data.data.creationDate), true, true) }}</b></p>
        <p v-if="data.data.lastUpdate"> تاریخ بروزرسانی: <b>{{
            toPersianDate(new Date(data.data.lastUpdate), true, true)
          }}</b></p>
      </div>
    </div>
    <h3 class="mt-5 mb-2 font-bold text-xl">اطلاعات آدرس</h3>
    <div class="card-body" v-if="data.data.address">
      <div class="flex flex-wrap justify-between gap-2">
        <p> تحویل گیرنده:<b>{{ data.data.address.name }} {{ data.data.address.family }} -
          {{ data.data.address.phoneNumber }} - {{
            data.data.address.nationalCode
          }}</b></p>
        <p> استان و شهر:<b>{{ data.data.address.shire }} - {{ data.data.address.city }}</b></p>
      </div>
      <div class="flex flex-wrap justify-between gap-2 pt-10">
        <p> آدرس پستی:<b>{{ data.data.address.postalAddress }}</b></p>
        <p> کد پستی:<b>{{ data.data.address.postalCode }}</b></p>
      </div>
    </div>
    <h3 class="mt-5 mb-2 font-bold text-xl">محصولات</h3>
    <div v-if="data.data.items">
      <div class="flex gap-2 items-center justify-between bg-white rounded shadow mb-3 p-2" v-for="item in data.data.items" :key="item.id"
           v-memo="item">
        <div class="flex gap-1 items-center">
          <img class="w-[50px] h-[50px] object-cover rounded-md" :src="ProductImageUrl(item.productImageName)"
               :alt="item.productTitle" loading="lazy" draggable="false">
          <p>{{ item.productTitle }}</p>
        </div>
        <div>
          <p>قیمت محصول: {{ item.price.toLocaleString() }} تومان</p>
          <p> تعداد محصول: {{ item.count }}</p>
          <p>جمع مبلغ:{{ item.totalPrice.toLocaleString() }} تومان</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ServiceGetOrderById} from "~/services/order.service";
import { ProductImageUrl } from "~/utils/imagePath";

const route = useRoute()
const orderId = route.query.id

const {data, status} = await useAsyncData(`order-${orderId}`, () => ServiceGetOrderById(Number(orderId)));

definePageMeta({
  title: "نمایش سفارش"
})
</script>