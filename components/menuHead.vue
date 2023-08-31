<template>
    <div>
        <ClientOnly>
            <el-menu :key="activeIndex" :default-active="activeIndex" :router="true" class="el-menu w-full"
                :class="{ exit: disabled, back: opacity }" mode="horizontal" :ellipsis="false" :style="{ border: 0 }"
                :background-color="styleHeader.top['background-color']" :text-color="styleHeader.top['text-color']"
                :active-text-color="!disabled && !opacity ? 'red' : 'black'" @select="handleSelect">

                <h3 class="my-0 ml-2 flex flex-items-center font-italic cursor-pointer"
                    :style="{ color: 'var(--el-menu-text-color)' }" @click="changeIndex">
                    广州懋鑫化工有限公司

                </h3>
                <div class="flex-grow" />
                <el-menu-item v-for="item in items" :index="item.key" :key="item.key">
                    <!-- <NuxtLink :to="item.to">{{ item.label }}</NuxtLink> -->
                    {{ item.label }}
                </el-menu-item>
            </el-menu>
        </ClientOnly>
    </div>
</template>
  
<script lang="ts" setup>
const { y } = useWindowScroll()
const disabled = ref(false)
const opacity = ref(false)
let histroyY = 0

//滚动条
watch(y, (data) => {
    if (data < histroyY && data != 0) {
        opacity.value = true
        disabled.value = false
    }
    else if (data > 0 && data > histroyY) {
        disabled.value = true
    } else {
        disabled.value = false
        opacity.value = false
    }
    histroyY = data
})
const route = useRoute()
const router = useRouter()
const activeIndex = useState('/')
const items = [
    { label: '首页', key: '/', to: '/' }, // 菜单项务必填写 key
    { label: '产品中心', key: '/Product', to: '/Product' },
    { label: '关于我们', key: '/about', to: '/about' },
    { label: '工厂环境', key: '/server', to: '/server' },
    { label: '合作伙伴', key: '/parter', to: '/parter' },
    { label: '联系我们', key: '/callme', to: '/callme' }
]
items.forEach(e => {
    if (route.path.includes(e.key)) {
        activeIndex.value = e.key
    }
})
const changeIndex = async () => {
    activeIndex.value = '/'
    await navigateTo('/', { replace: true })
}
const styleHeader = {
    top: {
        'background-color': "transparent",
        'text-color': "#000",
        'active-text-color': "#ffd04b",
    },
    NotTop: {
        'background-color': "rgb(193 193 193 / 36%)",
        'text-color': "#fff",
        'active-text-color': "#ffd04b",
    }
}
const handleSelect = async (key: string, keyPath: string[]) => {
    activeIndex.value = key
    await navigateTo(key)
}

</script>
  
<style>
.flex-grow {
    flex-grow: 1;
}

/* .el-menu--horizontal.el-menu{
    border: 0;
} */

.el-menu {
    transition: transform 0.5s ease-out, background-color 0.5s ease-out;
    transform: translateY(0);
    background-color: transparent;
    position: fixed;
    /* 初始背景色 */

}

.el-menu.exit {
    transform: translateY(-100%);
}

.el-menu.back {
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景色改为白色 */
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    background-color: rgba(0, 0, 0, 0);
    color: red
}
</style>
  