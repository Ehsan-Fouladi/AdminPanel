<template>
  <header class="py-4 px-5 bg-white border-b border-gray-200 flex justify-between items-center">
    <div v-if="isOpenSideBar" @click="isOpenSideBar = false" class="bg-black/65 z-[100] fixed inset-0"/>
    <div class="flex items-center gap-2">
      <i @click="isOpenSideBar = true" class="pi pi-align-right text-xl !hidden sm:!block"></i>
      <p class="text-xl">پنل مدیریت</p>
    </div>
    <div class="flex gap-2">
      <Button v-if="isDarkMode" @click="isDarkMode = !isDarkMode" severity="secondary" icon="pi pi-sun" aria-label="Sun" />
      <Button v-else @click="isDarkMode = !isDarkMode" severity="secondary" icon="pi pi-moon" aria-label="Moon" />
      <Button @click="$router.push('/auth')" severity="secondary" icon="pi pi-home" aria-label="Home" />
    </div>
  </header>
</template>
<script lang="ts" setup>
const isDarkMode = ref(false)
const isOpenSideBar = ref(false)
const emit = defineEmits(['changeSideBarStatus'])

watch(isOpenSideBar, (newVal)=>{
  emit('changeSideBarStatus', newVal)
})
</script>