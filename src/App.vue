<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import MainPage from './components/MainPage.vue'
</script>

<template>
  <div class="w-full bg-zinc-900 min-h-screen flex justify-center items-center p-5 md:p-10">
    <div
      class="lg:w-2/3 lg:h-2/3 w-full h-full shadow-md flex flex-col md:flex-row bg-gray-800 rounded-xl"
    >
      <SideBar />
      <MainPage />
    </div>
  </div>
</template>
