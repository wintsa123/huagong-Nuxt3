<template>
    <div>
        <el-divider />

        <el-page-header :icon="null" style="margin-bottom: 10px;margin-top: 10px" @back="handleBack">
            <template #title>
                <el-button color="#626aef" type="primary" :icon="ArrowLeft">返回</el-button>
            </template>

            <template #extra>
                <div class="flex items-center">
                    <el-button color="#626aef" type="primary" @click="page++;" :disabled="pageCount == page">
                        下一页<el-icon class="el-icon--right">
                            <ArrowRight />
                        </el-icon>
                    </el-button>
                </div>
            </template>

        </el-page-header>
        <el-divider />

        <div class="content" style="width: 75vw;margin: 0 auto">
            <div style="width: 100%;margin: 0 auto;display: flex;flex-wrap: wrap">
                <div class="content-item">
                    <h1 class="font-900 font-size-9">{{ (data as any).title }}</h1>
                </div>
                <div class="content-item"> <span style="color:#828585;marginRight:4px">{{ (data as any).updated_at }}
                    </span>•</div>
                <div class="content-item"> <el-image :src="(data as any).head_img || '/assets/test.jpg'"
                        style="width: 100%;height: auto;" fit="contain">

                        <template #error>
                            <div class="image-slot">
                                <el-icon>
                                    <CloseBold />
                                </el-icon>
                                Fail
                            </div>
                        </template>
                    </el-image></div>

            </div>
            <MdPreview :editorId="id" :modelValue="(data as any).content" />
            <el-descriptions class="margin-top" title="联系方式" :column="3" size="default" border>
                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            联系人
                        </div>
                    </template>
                   萨经理
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <iphone />
                            </el-icon>
                            Telephone
                        </div>
                    </template>
                    13710997945
                </el-descriptions-item>
               
               
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                               <Service />
                            </el-icon>
                            QQ
                        </div>
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"><ChatDotRound /></el-icon>

                        
                            微信
                        </div>
                    </template>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>
<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import {
    Iphone,
    OfficeBuilding,
    ArrowLeft,
    ArrowRight,
    CloseBold,
    Service,
    ChatDotRound,
    User
} from '@element-plus/icons-vue'
import { usePagination } from '@alova/scene-vue';
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight:  marginMap.default,
  }
})
const router = useRouter()
const route = useRoute()
const share = useshareData()
let tmpArr = share.value
let findObject = tmpArr?.find((item: any) => item.id == route.params.id);
let data: Ref<any> | null = null;
if (findObject) {
    data = ref(findObject)
} else {
    const result = await getArticleById(Number(route.params.id))
    data = (result.data) as any

}
const id = 'id';

const tags = ref(data?.value.tags.map((e: any) => e.id))
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
        initialPageSize: 1, // 初始每页数据条数，默认为10
    }
);
const handleBack = () => {
    if (page.value == 1) {
        router.go(-1);
    } else {
        page.value--;
    }
}
onSuccess((e: any) => {
    console.log(e.data.rows[0]);
    console.log(pageCount, page)
    if (e.data?.rows[0]) {

        data!.value = e.data?.rows[0]
    }
})
</script>
<style scoped>
.content-item {
    display: flex;
    justify-content: center;
    flex-basis: 100%;

}
</style>