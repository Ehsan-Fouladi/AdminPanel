<template>
  <aside :class="{ 'open': modelValue == true }" class="bg-white border-l border-gray-200 transition-all ">
    <div>
      <NuxtLink to="/" class="link">
        <i class="pi pi-book"></i>
        داشتبورد
      </NuxtLink>
      <NuxtLink to="/banners" class="link">
        <i class="pi pi-images"></i>
        مدیریت بنرها
      </NuxtLink>
      <NuxtLink to="/categorise" class="link">
        <i class="pi pi-book"></i>
        مدیریت دسته بندی ها
      </NuxtLink>
      <NuxtLink to="/users" class="link">
        <i class="pi pi-users"></i>
        مدیریت کاربران
      </NuxtLink>
      <NuxtLink to="/products" class="link">
        <i class="pi pi-book"></i>
        مدیریت محصولات
      </NuxtLink>
      <NuxtLink to="/orders" class="link">
        <i class="pi pi-shopping-bag"></i>
        مدیریت سفارشات
      </NuxtLink>
      <NuxtLink to="/comments" class="link">
        <i class="pi pi-comments"></i>
        مدیریت نظرات
      </NuxtLink>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
}>();
</script>
<style scoped>
@media screen and (max-width: 768px) {
  aside {
    position: absolute;
    top: 0;
    right: -100%;
    height: 100svh;
    z-index: 101;
  }

  aside.open {
    right: 0;
  }
}

.link {
  @apply px-4 py-5;
  display: flex;
  width: 100%;
  gap: .5rem;
  align-items: center;
  transition: all ease .2s;
}

.link:hover {
  @apply bg-surface-200 px-4 py-5;
}

.link i {
  font-size: 20px;
}

.link.router-link-exact-active {
  @apply bg-primary-100
}
</style>