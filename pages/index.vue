<template>
  <div class="allContent" >

    <div class="banner" :style="{ marginBottom: '10px' }">
      <Banner />

    </div>
    <div style="backgroundColor:#f9fafa;margin-bottom: 10px; padding-bottom: 10px;" class="product"
      v-if="Front['allow_product'].value">

      <el-divider content-position="center">最新产品</el-divider>

      <Content></Content>
    </div>
    <div style="backgroundColor:#ffffff;height:auto" v-if="Front['allow_aboutMe'].value">

      <el-divider content-position="center">关于我们</el-divider>

      <ShowEditor type="关于我们" style="margin-top: 30px"></ShowEditor>

    </div>
    <div style="backgroundColor:#ffffff;height:auto" v-if="Front['allow_server'].value">

      <el-divider content-position="center">工厂环境</el-divider>

      <ShowEditor type="工厂环境" style="margin-top: 30px"></ShowEditor>

    </div>
    <div style="backgroundColor:#ffffff;height:auto" v-if="Front['allow_Callme'].value">

      <el-divider content-position="center">联系我们</el-divider>

      <ShowEditor type="联系我们" style="margin-top: 30px"></ShowEditor>

    </div>
    <div style="backgroundColor:#ffffff;height:auto" v-if="Front['allow_link'].value">

      <el-divider content-position="center">合作伙伴</el-divider>

      <ShowEditor type="合作伙伴" style="margin-top: 30px"></ShowEditor>

    </div>

  </div>
</template>

<script setup lang="ts">
// const { height } = useWindowSize()

const Front = setFront()

if (!!Front) {
  const result = await getSetting()
  Front.value = result.data
}
</script>

<style scoped>
.banner {
  scroll-snap-align: start;
  scroll-snap-stop: always;

}

.product {
  scroll-snap-align: start;
  scroll-snap-stop: always;

}

</style>
