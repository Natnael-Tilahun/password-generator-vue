<script lang="ts" setup>
import { ref, type Ref } from 'vue'

const includeNumber: Ref<boolean> = ref(true)
</script>

<template>
  <div class="flex border-2 bg-green-400 rounded-full items-center cursor-pointer relative">
    <input
      id="passwordLength"
      class="accent-green-400 active:border-slate-200 bg-slate-200 border-none focus:bg-slate-4=200 focus:border-slate-200 focus:outline-none w-6 h-6"
      type="radio"
      value="true"
      v-model="includeNumber"
    />
    <input
      id="passwordLength"
      class="border-none outline-none active:outline-none accent-green-400 ring-green-400 m-0 p-0 ring-0 bg-green-400 h-6 w-6"
      type="radio"
      value="false"
      v-model="includeNumber"
    />
  </div>
</template>
