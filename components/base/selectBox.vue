<template>
  <div>
    <FloatLabel class="w-full" variant="on">
      <Select class="w-full" v-model="selectedValue" :invalid="meta.valid === false" :inputId="id" :options="options"
              optionLabel="name" :placeholder="label === undefined ? placeholder: ''"/>
      <label :for="id" v-if="label">{{ label }}</label>
    </FloatLabel>
    <p v-if="meta.touched && errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
import {useField} from "vee-validate";

const id = useId()
const selectedValue = ref()

const model = defineModel({
  type: String,
  required: false
});

const {name, label = null, placeholder = "انتخاب کنید", options} = defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
  options: {
    name: string,
    value: string
  }[]
}>()

const {errorMessage, setValue, meta} = useField(name, undefined, {
  initialValue: model[0]
})

watch(selectedValue, () => {
  setValue(selectedValue.value?.value ?? '');
  model.value = selectedValue.value?.value
})

onMounted(() => {
  if (model.value) {
    selectedValue.value = options.find(f => f.value === model.value)
  }
})
</script>