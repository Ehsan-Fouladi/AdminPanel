<template>
  <div>
    <div v-if="utilStore.globalLoading" class="bg-black/60 fixed top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center z-[10001]">
      <p class="text-lg text-white font-bold">Loading ...</p>
    </div>
    <Toast/>
    <NuxtLoadingIndicator/>
    <ConfirmDialog></ConfirmDialog>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import 'primeicons/primeicons.css'

const utilStore = useUtilStore()
</script>
