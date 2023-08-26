<template>
    <div>
        <div
            style="backgroundColor:white;height: 3em; display: flex;align-items: center;padding: 0.5rem 0;margin: 0 auto; ">
            <div class=" z-36" :style="{ width: '95%', margin: '0 auto' }">
                <el-scrollbar horizontal>

                    <ul :style="{
                        display: 'flex',
                        listStyle: 'none',
                        padding: 0,
                        whiteSpace: 'nowrap'
                    }">
                        <li v-for="item in data" :key="item" class="mr-1"> <el-check-tag :checked="item.checked"
                                @change="(event: any) => tagChange(item, event)"
                                style="borderRadius:2.5rem;height: 1.5rem;lineHeight:1.5rem">{{ item.name
                                }}</el-check-tag>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <ClientOnly>
            <div class="container" :style="{
                height: 'auto', width: '95%',
                margin: '0 auto 0',
            }" v-auto-anim>
                <wc-waterfall :cols="4" :gap="20" style="padding: 10px" v-auto-anim :ref="parent">
                    <div class="cardItem" v-for="item, index in ArticleData" :key="item"
                        @mouseenter="item.openWindow = true" @mouseleave="item.openWindow = false" :style="{
                            width: '20vw',
                            height: 'auto',
                        }">
                        <NuxtLink :to="`/Article/${item.id}`">
                            <el-card :body-style="{ padding: '0px' }" :style="{
                                transform: item.openWindow ? 'translateY(-10px)' : 'none',
                                boxShadow: item.openWindow ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
                            }">
                                <el-image :src="(item as any).head_img || '/assets/test.jpg'" class="image" fit="contain">

                                    <template #placeholder>
                                        <el-skeleton style="width: 240px" :loading="true" animated>
                                            <template #template>
                                                <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
                                                <div style="padding: 14px">
                                                    <el-skeleton-item variant="h3" style="width: 100%" />

                                                </div>
                                            </template>
                                        </el-skeleton>

                                    </template>
                                    <template #error>
                                        <div class="image-slot">
                                            <el-icon>
                                                <CloseBold />
                                            </el-icon>
                                            Fail
                                        </div>
                                    </template>
                                </el-image>
                                <!-- <div class="description" :class="{ 'active': item.openWindow }">
                                    {{ item.desc }}
                                </div> -->
                                <div style="padding: 14px">
                                    <div class="bottom">
                                        <div>{{ (item as any).title }}</div>

                                        <el-button text class="button" v-if="item.openWindow"> 点击打开详情</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </NuxtLink>
                    </div>
                </wc-waterfall>
                <div :style="{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }">
                    <div :style="{ flexBasis: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }">
                        <el-button color="#f0e9f6" size="large" v-if="!isLastPage" round @click="page++"
                            :loading="loading">加载更多</el-button>
                        <el-button text disabled v-if="isLastPage">到尽头了哦...</el-button>
                    </div>
                    <div v-if="(typeof total=='number')" :style="{ flexBasis: '100%', display: 'flex', justifyContent: 'center' }"> <el-progress
                            :percentage="percentage"
                            :format="(e: any) => { return `已查看${ArticleData.length}/${total}` }" 
                            />
                    </div>

                </div>
            </div>

        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
import { usePagination } from '@alova/scene-vue';
import { CloseBold } from '@element-plus/icons-vue'
import { vAutoAnimate } from "@formkit/auto-animate";
if (typeof document != 'undefined') import('wc-waterfall')
import { useAutoAnimate } from '@formkit/auto-animate/vue'
const [parent] = useAutoAnimate()

const { width } = useWindowSize()
const { data }: any = await getTagList()
const tagChange = (item: any, event: boolean) => {
    data.value.forEach((element: any) => {
        element.checked = false
    });
    item.checked = event
    if (item.id==0) {
        tags.value=''

    }else{
        tags.value=item.id

    }
}
// const ArticleData = ref([])
const params = ref({
    "pageSize": "3",
    "types": "1",
    "nowPage": "1"
})
// const { data: ArticleData, refresh, execute, pending }: any = await getAllArticle(params.value)

// 在useAsyncData中返回promise
//   const { data:datas } = useAsyncData(async () => {
//     return todoListGetter.send();
//   },{server:false});
//   console.log(datas)
const tags=ref('')

const {
    // 加载状态
    loading,
    // 列表数据
    data: ArticleData,
    insert,
    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,
    // 当前页码，改变此页码将自动触发请求
    page,
    // 每页数据条数
    pageSize,
    // 分页页数
    pageCount,
    // 总数据量
    total
}:any = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => todoListGetter(page, pageSize, 1,tags.value),
    {
        // 请求前的初始数据（接口返回的数据格式）
        initialData: {
            total: 0,
            data: []
        },
        total: (response: any) => response.total,
        data: (response: any) => response.rows,
        initialPage: 1, // 初始页码，默认为1
        initialPageSize: 12, // 初始每页数据条数，默认为10
        preloadPreviousPage: false, // 关闭预加载上一页数据
        append: true,
        watchingStates:[tags]
    }
);
const percentage=computed(()=> Math.floor(ArticleData.value.length * 100 / total.value))
</script>
<style lang="scss">
.time {
    font-size: 12px;
    color: #999;
}

.button {
    padding: 0;
    min-height: auto;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}

@media (max-width: 930px) {
    .container {
        margin: 50px auto 0;
        grid-template-columns: repeat(auto-fill, 40vw) !important;
    }


    .cardItem {
        width: 40vw !important;
    }
}

.el-progress.el-progress--line {
    width: 200px;
    flex-wrap: wrap;

    .el-progress-bar {
        width: 100%;
        flex-basis: 100% !important;
        margin-bottom: 10px;
    }

    .el-progress__text {
        width: 100%;

        flex-basis: 100% !important;
        display: flex;
        justify-content: center
    }
}

.el-card {
    border-radius: 12px
}
</style>