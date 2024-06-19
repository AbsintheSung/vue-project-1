<script setup>
import TheLayout from './components/TheLayout.vue'
import TheCard from './components/Cards/TheCard.vue'
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
          <input class="customInput" id="packageName" />
          <!-- <p class="mt-4 w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="imgUrlName">圖片網址</label>
          <input class="customInput" id="imgUrlName" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="attractionAreas">景點地區</label>
          <select class="customInput" id="attractionAreas">
            <option value="" disabled selected>請選擇景點地區</option>
            <option>高雄</option>
            <option>台中</option>
            <option>台北</option>
          </select>
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageAmount">套票金額</label>
          <input class="customInput" type="number" id="packageAmount" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageTickets">套票組數</label>
          <input class="customInput" type="number" id="packageTickets" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageStar">套票星級</label>
          <input class="customInput" type="number" id="packageStar" />
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <div class="flex flex-wrap">
          <label class="customLabelText" for="packageDescription">套票描述</label>
          <textarea class="customText" id="packageDescription"></textarea>
          <!-- <p class="w-full">我是警告標語</p> -->
        </div>
        <button class="formButton">新增套票</button>
      </form>
    </div>
  </TheLayout>
  <TheLayout class="primaryBackground">
    <TheCard></TheCard>
  </TheLayout>
</template>

<style scoped></style>
