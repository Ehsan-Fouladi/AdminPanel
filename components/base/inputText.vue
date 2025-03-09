<template>
  <div>
    <FloatLabel variant="on">
      <InputText class="w-full" :type="type" @blur="(e)=>handleBlur(e)" @change="(e)=>handleChange(e)" :invalid="meta.valid === false" :id="id"
                 v-model="model" :name="name" :placeholder="placeholder"/>
      <label :for="id" v-if="label">{{ label }}</label>
    </FloatLabel>
    <p v-if="meta.touched && errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
import {FloatLabel, InputText} from "primevue";
import {useField} from "vee-validate";
import type {InputTypeHTMLAttribute} from "vue";

const id = useId();

const model = defineModel({
  type: String,
  required: false
});

const {name, label = null, placeholder = "", type = 'text'} = defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
  type?: InputTypeHTMLAttribute
}>()

const {errorMessage, setValue, meta, handleChange, handleBlur} = useField(name, undefined, {
  initialValue: model[0]
})

watch(model, () => {
  setValue(model.value);
})
</script>

