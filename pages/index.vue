<template>
  <div class="allContent">

    <div class="banner" :style="{ marginBottom: '10px' }">
      <Banner />

    </div>
    <div style="backgroundColor:#ffffff;margin-bottom: 10px; padding-bottom: 10px;" class="product"
      v-if="Front['allow_product'].value">

      <el-divider content-position="center">最新产品</el-divider>
      <!-- <h1>最新产品</h1> -->

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

      <el-divider></el-divider>
      <h1>合作单位/客户</h1>
      <Swiper :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]" :slides-per-view="6" :spaceBetween="10"
        :loop="true" :effect="'creative'" :autoplay="{
          delay: 2000,
          disableOnInteraction: true,
        }" :navigation="true" :creative-effect="{
  prev: {
    shadow: false,
    translate: ['-20%', 0, -1],
  },
  next: {
    translate: ['100%', 0, 0],
  },
}">
        <SwiperSlide v-for="slide in data" :key="slide">
          <NuxtLink :to="slide.url">
            <div class="card">
              <div class="img"> <el-image fit="cover" style="width: 100%;" :src="slide.avatar">
                  <template #placeholder>

                    <div v-loading="true" class="image-slot  flex flex-items-center justify-center  w-full h-2xl">
                      Loading<span class="dot">...</span></div>
                  </template>
                </el-image></div>
              <div class="textBox">
                <p class="text head">{{ slide.name }}</p>

              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>

   
  </div>
</template>

<script setup lang="ts">
// const { height } = useWindowSize()
const { data, pending }: any = await getFriend()
const Front = setFront()

if (!!Front) {
  const result = await getSetting()
  Front.value = result.data
}
</script>

<style scoped>
.card {
  width: auto;
  /* height: 150px; */
  aspect-ratio: 16 / 9;
  background: #ffffff;
  border-radius: 15px;
  border: 1px solid rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.2s ease-in-out;
  overflow: hidden;

}

.img {

  position: relative;
  transition: 0.2s ease-in-out;
  z-index: 1;
}

.textBox {
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: 0.2s ease-in-out;
  z-index: 999;
}

.textBox>.text {
  font-weight: bold;
}

.textBox>.head {
  font-size: 20px;
}

.textBox>.price {
  font-size: 17px;
}

.textBox>span {
  font-size: 12px;
  color: lightgrey;
}

.card:hover>.textBox {
  opacity: 1;
}

.card .img:hover>.textBox {
  opacity: 1;
}


.card:hover>.img {
  height: 65%;
  filter: blur(7px);
  animation: anim 3s infinite;
}

@keyframes anim {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}

.card:hover {
  transform: scale(1.04) rotate(-1deg);
}


.banner {
  scroll-snap-align: start;
  scroll-snap-stop: always;

}

.product {
  scroll-snap-align: start;
  scroll-snap-stop: always;

}
</style>
