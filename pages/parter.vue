

<template>
    <div>
    <el-skeleton :rows="10" style="width: 100vw;height: 80vh;" :loading="loading" animated :throttle="500">
        <template #default>


            <div v-if="Front['Type_link'].value">
                <el-card class="box-card" style="border-radius:15px;margin: 20px;">
                    <h1>合作单位/伙伴</h1>
                    <desc>那些朋友，那些事</desc>
                    <div class="friend-cards">
                        <div v-for="item in FriData" :key="item" class="friend-card" data-aos="fade-up">
                            <NuxtLink :to="'https://' + item.url" rel="noopener" target="_blank">
                                <div class="card ">
                                    <div class="image" style="float: left; margin-right: 10px;flex-basis: 30%">
                                        <el-avatar style="border-radius: 15px;" shape="square" :size="100" fit="cover"
                                            :src="item.avatar" />

                                    </div>
                                    <div
                                        :style="{ flexBasis: '60%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }">
                                        <div class="card-title" :style="{ flexBasis: '100%', display: 'flex' }">{{ item.name
                                        }}
                                        </div>
                                        <div class="small-desc" :style="{ flexBasis: '100%', display: 'flex' }">
                                            {{ item.desc }}
                                        </div>
                                    </div>

                                    <div class="go-corner">
                                        <div class="go-arrow">→</div>
                                    </div>
                                </div>

                            </NuxtLink>

                        </div>
                    </div>
                </el-card>
            </div>
            <div v-else>
                <el-divider />
                <ShowEditor type="合作伙伴"></ShowEditor>
            </div>
        </template>
    </el-skeleton>
</div>
</template>
  

<script setup lang="ts">
const loading = ref(true)

const Front: any = setFront()
if (!!Front) {

    const result = await getSetting()
    Front.value = result.data
    loading.value = result.pending.value

}
const FriData = ref()

if (!!Front.value['Type_link'].value) {
    const { data,pending }: any = await getFriend()
    FriData.value = data.value
    loading.value = pending.value

}

</script>

<style scoped>
.friend-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    /* 控制卡片之间的间隔 */
}

.friend-card {
    flex: 1 1 calc(33.33% - 20px);
    /* 在每行最多显示三个卡片，同时考虑间隔 */
    max-width: calc(33.33% - 20px);
    box-sizing: border-box;
}

.friend:hover .hover-effect {
    transform: scale(2);
}

.card-title {
    color: #262626;
    font-size: 1.5em;
    line-height: normal;
    font-weight: 700;
    margin-bottom: 0.5em;
}

.small-desc {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5em;
    color: #452c2c;
}

.small-desc {
    font-size: 1em;
}

.go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    border-radius: 0 4px 0 32px;
}

.go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
}

.card {
    flex-wrap: wrap;

    display: flex;
    position: relative;
    max-width: 300px;
    max-height: 320px;
    background-color: #f2f8f9;
    border-radius: 10px;
    padding: 2em 1.2em;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    /* background: linear-gradient(to bottom, #c3e6ec, #a7d1d9); */
    font-family: Arial, Helvetica, sans-serif;
}

.card:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #364a60, #384c6c);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.35s ease-out;
}

.card:hover:before {
    transform: scale(28);
}

.card:hover .small-desc {
    transition: all 0.5s ease-out;
    color: rgba(255, 255, 255, 0.8);
}

.card:hover .card-title {
    transition: all 0.5s ease-out;
    color: #ffffff;
}


/* 响应式调整：在较小的屏幕上，每行显示一个卡片 */
@media (max-width: 768px) {
    .friend-card {
        flex: 1 1 100%;
        max-width: 100%;
    }
}
</style>
