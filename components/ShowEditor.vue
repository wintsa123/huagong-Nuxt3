<template>
    <div>
        <el-skeleton :rows="10" style="width: 100vw;height: 80vh;" :loading="pending" animated :throttle="500">
            <template #default>
                <div v-if="pending"> <el-skeleton :rows="5" animated />
                </div>
                <div class="common-layout" style="width: 85vw;margin: 0 auto;" v-else>
                    <el-container>
                        <el-main>
                            <MdPreview :editorId="id" :modelValue="(data! as any).content" />
                        </el-main>
                        <!-- <el-affix :offset="0"> -->
                        <!-- <el-divider direction="vertical" border-style="dashed" style="height: 100vh;" /> -->
                        <!-- </el-affix> -->
                        <!-- <el-affix :offset="20"> -->
                        <el-aside width="200px" style="position: fixed;right: 20px;top: 20px;">
                            <h1>目录</h1>
                            <MdCatalog :editorId="id" :scrollElement="scrollElement" />
                        </el-aside>
                        <!-- </el-affix> -->
                    </el-container>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
  
<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
const props = defineProps<{
    type: any
}>()
const { data, pending } = await ArticleType(props.type)
const id = props.type;
const scrollElement = ref()
// const { height } = useWindowSize()

nextTick(() => {
    if (typeof document !== 'undefined') {
        scrollElement.value = document.documentElement

    }
})


</script>