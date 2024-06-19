<script setup>
import TheLayout from './components/TheLayout.vue'
import TheCard from './components/Cards/TheCard.vue'
import { computed, ref } from 'vue'
//原始資料
const tickData = ref([
  {
    id: 0,
    tickName: '肥宅心碎賞櫻3日',
    tickImg:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
    tickArea: '高雄',
    tickDescript: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
    tickCount: 87,
    tickAmount: 1400,
    tickStar: 10
  },
  {
    id: 1,
    tickName: '貓空纜車雙程票',
    tickImg:
      'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    tickArea: '台北',
    tickDescript: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
    tickCount: 99,
    tickAmount: 240,
    tickStar: 2
  },
  {
    id: 2,
    tickName: '台中谷關溫泉會1日',
    tickImg:
      'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    tickArea: '台中',
    tickDescript:
      '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
    tickCount: 20,
    tickAmount: 1765,
    tickStar: 7
  }
])
//篩選 原始區域
const selectData = ref(['全部地區', '高雄', '台北', '台中'])
const selectValue = ref('全部地區')

//傳遞資料用這包
const tickDataList = computed(() => {
  if (selectValue.value === '全部地區') {
    return tickData.value
  } else {
    return tickData.value.filter((dataItem) => dataItem.tickArea === selectValue.value)
  }
})
//取 id 先用 index 代替
const tickDataLength = computed(() => {
  return tickData.value.length
})
const userData = ref({
  id: tickDataLength,
  tickName: '', //套票名稱
  tickImg: '', //套票圖片
  tickArea: '', //區域
  tickAmount: '', //套票金額
  tickCount: '', //套票數量
  tickStar: '', //套票星級
  tickDescript: '' //套票描述
})
const addTicket = () => {
  tickData.value.push(userData.value)
}
const filterArea = (event) => {
  selectValue.value = event.target.value
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
      <select @change="filterArea" class="cardSelect" value="全部地區" selected>
        <option v-for="item in selectData" :key="item" :value="item">{{ item }}</option>
        <!-- <option value="全部地區">全部地區</option>
        <option value="高雄">高雄</option>
        <option value="台中">台中</option>
        <option value="台北">台北</option> -->
      </select>
      <p>本次搜尋共 6 筆</p>
    </div>
    <TheCard :tickData="tickDataList"></TheCard>
  </TheLayout>
</template>

<style scoped></style>
