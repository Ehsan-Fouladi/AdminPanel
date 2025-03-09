<template>
  <div class="card flex flex-col items-center gap-6 mt-8">
    <div class="flex gap-2">
      <FileUpload :choose-label="ChooseLabel" mode="basic" :accept="accept" @select="onFileSelect" customUpload auto
                  severity="secondary" class="p-button-outlined"/>
      <Button v-if="model" @click="remove" severity="danger" label="حذف فایل" />
    </div>
    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full"/>
  </div>
</template>
<script setup lang="ts">
const src = ref('')
const model = defineModel({
  type: Blob || null
});

const {ChooseLabel = "انتخاب عکس", accept = "image/*"} = defineProps<{
  ChooseLabel?: string,
  accept?: string
}>()

const onFileSelect = (event: any) => {
  const file = event.files[0];
  model.value = file;
  const reader = new FileReader();

  reader.onload = async (e) => {
    //@ts-ignore
    src.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

const remove = () => {
  //@ts-ignore
  model.value = null;
  src.value = "";
}
</script>