<template>
    <div ref="el">
        <div
            style="backgroundColor:white;height: 3em; display: flex;align-items: center;padding: 0.5rem 0;margin: 0 auto; ">
            <div class=" z-36" :style="{ width: '95%', margin: '0 auto' }">
                <el-scrollbar horizontal>
                    <ul v-if="loading"> </ul>

                    <ul :style="{
                        display: 'flex',
                        listStyle: 'none',
                        padding: 0,
                        whiteSpace: 'nowrap'
                    }">
                        <li v-for="item in data" :key="item.id" class="mr-1"> <el-check-tag :checked="item.checked"
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
                <el-empty v-if="ArticleData.length == 0" description="没有内容哦...可以先查看别的标签" />
                <Transition appear>

                    <wc-waterfall :cols="col" :gap="gap" style="padding: 10px" v-auto-anim :ref="parent"
                        v-if="ArticleData.length > 0">

                        <div class="cardItem" v-for="item, index in ArticleData" :key="item.id" data-aos="fade-up"
                            @mouseenter="item.openWindow = true" @mouseleave="item.openWindow = false" :style="{
                                width: '20vw',
                                height: 'auto',
                            }">
                            <NuxtLink :to="`/Product/${item.id}`">
                                <el-card :body-style="{ padding: '0px' }" :style="{
                                    transform: item.openWindow ? 'translateY(-10px)' : 'none',
                                    boxShadow: item.openWindow ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'

                                }">
                                    <el-image :src="(item as any).head_img || '/assets/test.jpg'" class="image"
                                        fit="contain">

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
                                    <div v-if="item.desc.length > 0" class="description">
                                        {{ item.desc }}
                                    </div>
                                    <div style="padding: 14px">
                                        <div class="bottom">
                                            <div>{{ (item as any).title }}</div>

                                            <el-button text class="button" v-if="item.openWindow"> 点击打开</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </NuxtLink>
                        </div>

                    </wc-waterfall>
                </Transition>

                <div :style="{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }">
                    <div :style="{ flexBasis: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }">

                        <button class="loadMore" v-if="!isLastPage" @click="page++" :loading="loading"
                            style=" color:#f0e9f6">
                            加载更多
                            <div class="arrow-wrapper">
                                <div class="arrow"></div>

                            </div>
                        </button>
                        <!-- <el-button color="#f0e9f6" size="large" v-if="!isLastPage" round @click="page++"
                            :loading="loading">加载更多</el-button>-->
                        <el-button text disabled v-if="isLastPage">到尽头了哦...</el-button>
                    </div>
                    <div v-if="(typeof total == 'number')"
                        :style="{ flexBasis: '100%', display: 'flex', justifyContent: 'center' }"> <el-progress
                            :percentage="percentage" :format="(e: any) => { return `已查看${ArticleData.length}/${total}` }" />
                    </div>

                </div>
            </div>

        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
import { usePagination } from '@alova/scene-vue';
import { CloseBold } from '@element-plus/icons-vue'
if (typeof document != 'undefined') import('wc-waterfall')
import { useAutoAnimate } from '@formkit/auto-animate/vue'
const [parent] = useAutoAnimate()
const gap = ref(20)
const col = ref(4)
const el = ref(null)

useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    if (width < 1000 && width > 910) {
        gap.value = 5
        col.value = 3
    }
    else if (width < 910 && width > 420) {
        col.value = 2
        gap.value = 10

    } else if (width < 420) {
        col.value = 1
        gap.value = 0

    } else {
        gap.value = 20
        col.value = 4
    }
})
const data = ref<any>([])
// if (!route.params.search) {
//     const result: any = await getTagList()
//     watch(result.data, (item) => {
//         console.log(item)
//         data.value = item

//     })
// }
const tagChange = (item: any, event: boolean) => {
    data.value.forEach((element: any) => {
        element.checked = false
    });
    item.checked = event
    if (item.id == 0) {
        tags.value = ''

    } else {
        tags.value = item.id

    }
}

const tags = ref('')

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
    total,
    onSuccess
}: any = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => todoListGetter(page, pageSize, 1, tags.value),
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
        watchingStates: [tags]
    }
);
const shareData = useshareData()
let isflag = 0
onSuccess((e: any) => {
    shareData.value = e.data.rows

    if ( isflag == 0) {
        isflag++
        const tags = useUniqBy(
            e.data.rows.flatMap((item: any) =>
                item.tags.map((i: any) => ({
                    id: i.id,
                    name: i.name,
                    checked: false
                }))), 'id'
        );
        tags.unshift({
            id: 0,
            name: '所有产品',
            checked: true
        })
        data.value = tags
    }
})

const percentage = computed(() => Math.floor(ArticleData.value.length * 100 / total.value))
</script>

<style lang="scss" scoped>
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

:deep(.el-progress.el-progress--line) {
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

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.el-card:hover .description {
    transform: rotateX(0deg);
    opacity: 0.4;
}

.description {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.loadMore {
    cursor: pointer;
    --primary-color: rgb(107, 33, 168);
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
}

.loadMore .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loadMore .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
}

.loadMore .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
}

.loadMore:hover {
    background-color: var(--hover-color);
}

.loadMore:hover .arrow {
    background: var(--secondary-color);
}

.loadMore:hover .arrow:before {
    right: 0;
}
</style>