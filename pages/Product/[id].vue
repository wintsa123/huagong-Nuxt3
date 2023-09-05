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
                    232166209
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <ChatDotRound />
                            </el-icon>


                            微信
                        </div>

                    </template>
                    <el-popover placement="top" :width="200" trigger="click" title="点击可以放大图片">
                        <template #default> <el-image style="width: 100%; height: auto"  :zoom-rate="1.2" :previewSrcList="['/assets/weixin.png']"
                                fit="fill" src="/assets/weixin.png"/></template>
                        <template #reference>
                            <button class="weixin">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20">
                                        <path fill="#888888"
                                            d="M14 7.3c3.2 0 6 2.258 6 5.007c0 1.472-1.1 2.846-2.5 3.926L18 18l-1.9-1.08c-.7.196-1.4.393-2.1.393c-3.4 0-6-2.258-6-5.006C8 9.558 10.7 7.3 14 7.3ZM7 2c3.5 0 6.5 2.061 7.3 4.81h-.7c-3.4 0-5.999 2.454-5.999 5.497c0 .49.1.981.2 1.472h-.7c-.9 0-1.6-.196-2.5-.393l-2.5 1.178l.699-2.06C1.1 11.324 0 9.753 0 7.89C0 4.552 3.1 2 7 2Zm5.1 8.049c-.3 0-.7.393-.7.687c0 .392.3.687.7.687c.5 0 .9-.392.9-.687c0-.393-.4-.687-.9-.687Zm3.8 0c-.3 0-.7.393-.7.687c0 .392.4.687.7.687c.6 0 .9-.392.9-.687c0-.393-.4-.687-.9-.687ZM4.8 4.846c-.6 0-1.1.393-1.1.884c0 .589.6.884 1.1.884c.5 0 .8-.295.9-.884c0-.59-.4-.884-.9-.884Zm4.9 0c-.6 0-1.1.393-1.1.884c0 .589.6.884 1.1.884c.5 0 .9-.295.9-.884c0-.59-.4-.884-.9-.884Z">
                                        </path>
                                    </svg>
                                </span>


                                <span class="text1">加我微信聊天</span>
                                <span class="text2">扫一下码</span>
                            </button>
                        </template>
                    </el-popover>

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
        marginRight: marginMap.default,
    }
})
const router = useRouter()
const route = useRoute()
const share = useshareData()

let tmpArr = share.value
let findObject = tmpArr?.find((item: any) => item.id == route.params.id);
let data: any|Ref<any> | null = null;
if (findObject) {
    data = ref(findObject)
} else {
    const result = await getArticleById(Number(route.params.id))
    data = (result.data) as any

}
const meta = {
      title: data.value.title,
      meta: [
        {
          name: 'description',
          content: data.value.desc,
        },
      ],
    };
useHead(meta)
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

.weixin {
    cursor: pointer;
    position: relative;
    width: 130px;
    height: 35px;
    border-radius: 30px;
    background-color: white;
    border: 1px #111111 solid;
    overflow: hidden;
}

.text1 {
    font-size: 15px;
    font-weight: 600;
    margin-left: 22%;
}

.text2 {
    position: absolute;
    top: 25%;
    left: -80px;
    font-weight: 700;
    font-size: 14px;
    color: white;
}

.icon {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s;
}

.icon::before {
    position: absolute;
    left: -100px;
    top: 0;
    z-index: -1;
    content: '';
    width: 130px;
    height: 33px;
    border-radius: 30px;
    background-color: #1fc419;
}

.weixin:hover .icon {
    transform: translateX(96px);
    transition: transform 0.5s;
}

.weixin:hover .text2 {
    transform: translateX(100px);
    transition: transform 0.6s;
}

.weixin:active {
    transform: scale(1.03);
}
</style>