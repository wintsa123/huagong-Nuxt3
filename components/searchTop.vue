<template>
    <div style="width:95%;margin: 0 auto;">
        <el-row class="row-bg  " justify="center">
            <el-col :span="12" :style="{ width: '77%', height: 'auto' }">

                <div>
                    <h1 class="font-size-15 font-300">最新产品</h1>
                    <div class="content">
                        <p>喺度你可以了解所有最新最全面嘅資訊及更新</p>
                    </div>
                </div>

                <el-form :inline="true" :model="formInline" class="demo-form-inline">

                    <el-form-item class="w-full">
                        <el-input v-model="formInline.search" class="m-2 h-14" size="large"
                            placeholder="搜索我司产品" :prefix-icon="Search" style="width: 70%" /> 
                            <el-button color="#f0e9f6" size="large" style="height:4.4em;width: 15%"  >搜索</el-button>


                    </el-form-item>
                    </el-form>

            </el-col>
            <el-col :span="12">

                <el-image :style="{ width: '77%', height: 'auto' }" src="assets/testbg.svg" fit="fill" />
            </el-col>

        </el-row>
    </div>
</template>

<script setup lang="ts">

import { Search } from '@element-plus/icons-vue'
const formInline = reactive({
    search: '',

})
const input1 = ref('')
</script>

<style>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>