<script setup>
import TheLayout from './components/TheLayout.vue'
import TheCard from './components/Cards/TheCard.vue'
import { ref } from 'vue'
const userData = ref({
  tickName: '', //套票名稱
  tickImg: '', //套票圖片
  tickArea: '', //區域
  tickAmount: '', //套票金額
  tickCount: '', //套票數量
  tickStar: '', //套票星級
  tickDescript: '' //套票描述
})
const addTicket = () => {
  console.log(userData.value)
}
</script>

<template>
  <TheLayout>
    <div class="customMainView">
      <div class="customImgView">
        <img class="customLogoImg" src="./assets/images/logo.png" />
        <img class="customMainImg" src="./assets/images/main_img.png" />
      </div>
      <form class="customFormView">
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageName">套票名稱</label>
          <input class="customInput" id="packageName" v-model="userData.tickName" />
          <!-- <p class="mt-4 w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="imgUrlName">圖片網址</label>
          <input class="customInput" id="imgUrlName" v-model="userData.tickImg" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="attractionAreas">景點地區</label>
          <select class="customInput" id="attractionAreas" v-model="userData.tickArea">
            <option value="" disabled selected>請選擇景點地區</option>
            <option>高雄</option>
            <option>台中</option>
            <option>台北</option>
          </select>
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageAmount">套票金額</label>
          <input
            class="customInput"
            type="number"
            id="packageAmount"
            v-model="userData.tickAmount"
          />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageTickets">套票組數</label>
          <input
            class="customInput"
            type="number"
            id="packageTickets"
            v-model="userData.tickCount"
          />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageStar">套票星級</label>
          <input class="customInput" type="number" id="packageStar" v-model="userData.tickStar" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabelText" for="packageDescription">套票描述</label>
          <textarea
            class="customText"
            id="packageDescription"
            v-model="userData.tickDescript"
          ></textarea>
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <button class="formButton" @click.prevent="addTicket">新增套票</button>
      </form>
    </div>
  </TheLayout>
  <TheLayout class="primaryBackground">
    <div class="cardSelectBox">
      <select class="cardSelect" value="全部地區" selected>
        <option value="全部地區">全部地區</option>
        <option value="高雄">高雄</option>
        <option value="台中">台中</option>
        <option value="台北">台北</option>
      </select>
      <p>本次搜尋共 6 筆</p>
    </div>
    <TheCard></TheCard>
  </TheLayout>
</template>

<style scoped></style>
