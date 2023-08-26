<script setup>



</script>

<template>
          <!-- <el-scrollbar > -->

  <div class="common-layout">
    <el-container>
      <el-header class=" z-12 w-full" :class="{ fixed: fixed }">
        <menuHead></menuHead>
      </el-header>
      <NuxtLoadingIndicator />
      <el-main :style="{overflow:'hidden'}">
          <LazyNuxtPage />

      </el-main>
      <!-- <el-footer class="fixed bottom-0">
        <div class="flex flex-items-center justify-center   w-full"> Copyright @ 2019-{{ new Date().getFullYear() }} All
          Rights
          Reserved</div>
      </el-footer> -->
    </el-container>
  </div>
<!-- </el-scrollbar> -->

</template>


<script setup lang="ts">
let route=useRoute()
console.log(route.path)
const fixed =computed(()=>{
  return route.path=='/'
})
</script>

<style >
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}



</style>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>