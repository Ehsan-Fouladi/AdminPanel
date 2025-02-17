<template>
  <div>
    <div class="card">
      <Button class="mb-2">افزودن کاربر جدید</Button>
      <DataTable :value="customers" tableStyle="min-width: 50rem">
        <Column field="name" header="نام"></Column>
        <Column field="family" header="نام خانوادگی"></Column>
        <Column field="email" header="ایمیل"></Column>
        <Column field="phoneNumber" header="شماره تلفن"></Column>
        <template #footer>
          <div class="w-full flex justify-center items-center">
            <BasePagination/>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
const customers = ref([
  {
    name: "احسان",
    family: "فولادی",
    email: "example@gmail.com",
    phoneNumber: "09123456789"
  }
])
</script>