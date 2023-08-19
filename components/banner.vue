<template>
    <el-carousel :height="width*740/1920+'px'"    :autoplay="true">
        <el-carousel-item v-for="item in data" :key="item" >
            <el-image fit="contain" width='100%' height='100%' :src="runtimeConfig.public.QINIU_CDN_URL + item.qiniu_key" >
                <template #placeholder>
            
                    <div v-loading="true" class="image-slot  flex flex-items-center justify-center  w-full h-2xl">Loading<span class="dot">...</span></div>
                </template>
            </el-image>
        </el-carousel-item>
    </el-carousel>
</template>
  
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

const {width}=useWindowSize()
const runtimeConfig = useRuntimeConfig()
const { data }: any = await getImg('homeImage')

</script>
<style scoped>
.demo-image__placeholder .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    vertical-align: top;
}

.demo-image__placeholder .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.demo-image__placeholder .el-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
}

.demo-image__placeholder.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 14px;
}

.demo-image__placeholder .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
/* :deep(.el-carousel__container){
    width: 100%;
    height:740px;
} */
</style>