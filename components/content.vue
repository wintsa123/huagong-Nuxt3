<template>
    <div>
        <div
            style="backgroundColor:white;height: 3em; display: flex;align-items: center;padding: 0.5rem 0;margin: 0 auto; ">
            <div class=" z-36" :style="{ width: '95%', margin: '0 auto' } " >
                <!-- <el-scrollbar> -->
                    <ul :style="{
                        display: 'flex',
                        listStyle: 'none',
                        padding: 0,
                    }">
                        <li v-for="item in data" :key="item" class="mr-1"> <el-check-tag :checked="item.checked"
                                @change="(event: any) => tagChange(item, event)"
                                style="borderRadius:2.5rem;height: 1.5rem;lineHeight:1.5rem">{{ item.name
                                }}</el-check-tag>
                        </li>
                    </ul>
                <!-- </el-scrollbar> -->
            </div>
        </div>
        <div :style="{ height: '10em',width:'95%' }">
            <div :style="{ height: '10em',width:'50px' }"> <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image" />
                        <div style="padding: 14px">
                            <span>Yummy hamburger</span>
                            <div class="bottom">
                                <time class="time">1</time>
                                <el-button text class="button">Operating</el-button>
                            </div>
                        </div>
                    </el-card></div>
                   
                
        </div>
      
    </div>
</template>

<script setup lang="ts">
const { width } = useWindowSize()
const { data }: any = await getTagList()
const tagChange = (item: any, event: boolean) => {
    data.value.forEach((element: any) => {
        element.checked = false
    });
    item.checked = event
}
const { data:ArticleData ,refresh}: any = await getAllArticle({
	"pageSize": "9",
	"types": "1",
	"nowPage": "1"
})
console.log(ArticleData)
const currentDate = ref(new Date())

</script>
<style>
.time {
  font-size: 12px;
  color: #999;
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
</style>