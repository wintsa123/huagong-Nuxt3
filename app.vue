<script setup>



</script>

<template>
  <div class="common-layout">

    <el-container>
      <el-header class=" z-999 w-full" :class="{ fixed: fixed }">
        <menuHead></menuHead>
      </el-header>
      <NuxtLoadingIndicator />

      <el-main style="overflow-y: hidden">

        <LazyNuxtPage />

      </el-main>

      <el-footer class="footer">
        <div class="container" style="line-height: 1.5;">
          <div class="row">
            <div class="footer-col">
              <h4>导航菜单</h4>
              <ul>
                <li>
                  <NuxtLink to="/">首页</NuxtLink>
                </li>

                <li>
                  <NuxtLink to="/product">产品中心</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/about">关于我们</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/server">工厂环境</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/parter">合作伙伴</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/callme">联系我们</NuxtLink>
                </li>

              </ul>
            </div>
            <div class="footer-col">
              <h4>联系我们</h4>
              <div class="social-links">
                <NuxtLink>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="#888888"
                      d="M18.496 13.607c-.134-1.931-1.372-3.55-2.088-4.387c.1-.243.341-1.653-.593-2.615c.002-.023.002-.046.002-.068C15.817 2.743 13.237.012 10 0C6.763.013 4.183 2.743 4.183 6.537c0 .023 0 .046.002.068c-.934.962-.692 2.372-.593 2.615c-.715.837-1.953 2.456-2.088 4.387c-.024.508.051 1.248.288 1.577c.289.4 1.081-.081 1.648-1.362c.158.594.521 1.5 1.345 2.649c-1.378.33-1.771 1.752-1.307 2.53c.327.548 1.075.999 2.365.999c2.296 0 3.31-.645 3.763-1.095c.091-.099.225-.146.394-.146c.17 0 .303.047.394.146c.453.45 1.467 1.095 3.762 1.095c1.29 0 2.039-.45 2.366-.999c.464-.778.07-2.2-1.307-2.53c.824-1.15 1.188-2.055 1.345-2.649c.567 1.281 1.36 1.763 1.648 1.362c.237-.33.312-1.07.288-1.577Z">
                    </path>
                  </svg>
                </NuxtLink>
                <NuxtLink>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="#888888"
                      d="M14 7.3c3.2 0 6 2.258 6 5.007c0 1.472-1.1 2.846-2.5 3.926L18 18l-1.9-1.08c-.7.196-1.4.393-2.1.393c-3.4 0-6-2.258-6-5.006C8 9.558 10.7 7.3 14 7.3ZM7 2c3.5 0 6.5 2.061 7.3 4.81h-.7c-3.4 0-5.999 2.454-5.999 5.497c0 .49.1.981.2 1.472h-.7c-.9 0-1.6-.196-2.5-.393l-2.5 1.178l.699-2.06C1.1 11.324 0 9.753 0 7.89C0 4.552 3.1 2 7 2Zm5.1 8.049c-.3 0-.7.393-.7.687c0 .392.3.687.7.687c.5 0 .9-.392.9-.687c0-.393-.4-.687-.9-.687Zm3.8 0c-.3 0-.7.393-.7.687c0 .392.4.687.7.687c.6 0 .9-.392.9-.687c0-.393-.4-.687-.9-.687ZM4.8 4.846c-.6 0-1.1.393-1.1.884c0 .589.6.884 1.1.884c.5 0 .8-.295.9-.884c0-.59-.4-.884-.9-.884Zm4.9 0c-.6 0-1.1.393-1.1.884c0 .589.6.884 1.1.884c.5 0 .9-.295.9-.884c0-.59-.4-.884-.9-.884Z">
                    </path>
                  </svg>
                </NuxtLink>
                <NuxtLink>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="#888888"
                      d="M14.812 9.801c-.778-.141-.4-.534-.4-.534s.761-1.178-.15-2.034c-1.13-1.061-3.877.135-3.877.135c-1.05.306-.77-.14-.622-.897c0-.892-.326-2.402-3.12-1.51C3.853 5.858 1.455 9 1.455 9C-.212 11.087.01 12.7.01 12.7c.416 3.562 4.448 4.54 7.584 4.771c3.299.243 7.752-1.067 9.102-3.76c1.35-2.696-1.104-3.763-1.884-3.91Zm-1.044 2.549c0 2.051-2.653 3.977-5.93 4.117c-3.276.144-5.923-1.398-5.923-3.45c0-2.054 2.647-3.7 5.923-3.842c3.277-.142 5.93 1.126 5.93 3.175Zm-6.584-1.823c-3.293.362-2.913 3.259-2.913 3.259s-.034.917.883 1.384c1.927.98 3.912.387 4.915-.829c1.003-1.216.415-4.173-2.885-3.814Zm.281 3.075c0 .48-.498.925-1.112.99c-.614.068-1.11-.265-1.11-.747s.44-.985 1.055-1.045c.707-.064 1.167.318 1.167.802Zm1.003-1.15c.11.174.031.437-.173.588c-.208.146-.464.126-.574-.05c-.115-.17-.072-.445.139-.588c.244-.171.498-.122.608.05Zm4.86-9.806c.335-.06 1.532-.281 2.696-.025c2.083.456 4.941 2.346 3.655 6.368c-.094.575-.398.62-.76.62c-.432 0-.781-.255-.781-.662c0-.352.155-.71.155-.71c.046-.148.411-1.07-.241-2.448c-1.198-1.887-3.609-1.915-3.893-1.807a3.48 3.48 0 0 1-.591.141l-.106.016l-.014.002c-.437 0-.786-.333-.786-.737a.75.75 0 0 1 .573-.715s.007-.011.018-.014c.024-.004.049-.027.075-.029Zm.66 2.611s3.367-.584 2.964 2.811a.21.21 0 0 1-.007.054c-.037.241-.264.426-.529.426c-.3 0-.543-.225-.543-.507c0 0 .534-2.269-1.885-1.768c-.299 0-.538-.227-.538-.505c0-.283.24-.51.538-.51Z">
                    </path>
                  </svg>


                </NuxtLink>
                <NuxtLink>

                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="#888888" fillRule="evenodd"
                      d="M18.333 2.5c.92 0 1.667.746 1.667 1.667v11.666c0 .92-.746 1.667-1.667 1.667H1.667C.747 17.5 0 16.754 0 15.833V4.167C0 3.247.746 2.5 1.667 2.5h16.666ZM7.168 11.328l-4.91 4.852h15.325l-4.857-4.802L10 13.265l-2.832-1.937ZM18.64 7.292l-4.796 3.316l4.796 4.736V7.292Zm-17.279.061v7.836l4.686-4.631l-4.686-3.205Zm16.956-3.532H1.698a.358.358 0 0 0-.25.086a.26.26 0 0 0-.085.222v1.62L10 11.656l8.644-5.965V4.199c.001-.134-.03-.231-.092-.292a.306.306 0 0 0-.234-.086Z">
                    </path>
                  </svg>


                </NuxtLink>
              </div>
            </div>
          </div>
          <div style="color: rgb(107 104 104)">Copyright © 2023 - 2028 化工有限公司 All Rights Reserved
          </div>
        </div>

      </el-footer>
    </el-container>
  
  </div>
</template>


<script setup lang="ts">
import { useStorage } from '@vueuse/core'

let route=useRoute()
import AOS from 'aos';
onMounted(() => AOS.init({
        easing: 'ease-out-back',
        duration: 2000
    })
);

const fixed =computed(()=>{
  return route.path=='/'
})
const {data}=  vistitLog()
const Front=setFront()
if (!!Front) {
    const result=await getSetting()
    Front.value=result.data
}
const time = useStorage('time') 
// console.log(time.value)
const open = () => {
  ElMessageBox.alert(`${Front.value['home_modal_content'].value}`, 'Hello', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
  })
  const currentTime = new Date();
  time.value=currentTime
}
onMounted(()=>{
  if (Front.value['allow_home_modal'].value) {
    const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);
const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);
if (!!time.value &&(new Date(time.value)>=new Date(todayStart) && new Date(time.value)<=new Date(todayEnd))) {
  console.log('已经提示过了');
  // time.value=false
} else {
  // 更新时间值为当前时间
  open()}}
  }

)
// 获取今天的0点和24点时间

</script>

<style >
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.container {
  max-width: 1170px;
  margin: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

ul {
  list-style: none;
}

.footer {
  height: AUTO !important;
  background-color: #24262b;
  padding: 70px 0;
}

.footer-col {
  width: 25%;
  /* padding: 0 15px; */
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}

.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}

/*responsive*/
@media(max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media(max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>