<script setup>
import TheLayout from './components/TheLayout.vue';
import TheCard from './components/Cards/TheCard.vue';
import { computed, ref, nextTick } from 'vue';
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'; //引入vee-validate 會用的組件，方法及配置項
import { all } from '@vee-validate/rules'; //引入 vee-validate-rules 的所有規則api
import { localize, setLocale } from '@vee-validate/i18n'; //轉譯中文用
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'; //轉譯中文用
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
]);

//篩選 原始區域
const selectData = ref(['全部地區', '高雄', '台北', '台中']);

//篩選 狀態
const selectValue = ref('全部地區');

//傳遞資料用這包
const tickDataList = computed(() => {
  if (selectValue.value === '全部地區') {
    return tickData.value;
  } else {
    return tickData.value.filter((dataItem) => dataItem.tickArea === selectValue.value);
  }
});

//取 id 先用 index 代替( 初始化的值非響應式，不能用computed，所以改回一般函數 )
const tickDataLength = () => {
  return tickData.value.length;
};

//建立初始化資料
const initialData = {
  tickName: '', //套票名稱
  tickImg: '', //套票圖片
  tickArea: '', //區域
  tickAmount: '', //套票金額
  tickCount: '', //套票數量
  tickStar: '', //套票星級
  tickDescript: '' //套票描述
};
//將資料做響應式關聯
const userData = ref({ id: tickDataLength(), ...initialData });

//配置語言環境
setLocale('zh_TW');

//設定 vee-validate 相關配置
configure({
  generateMessage: localize({ zh_TW: zhTW }), //localize 將生成的訊息做翻譯
  validateOnInput: true //輸入就會驗證，false為離開focus狀態才驗證
});

//根據每個 Field標籤的 name，給予規則判斷
const schema = {
  tickName: 'required', //必填
  tickImg: 'required|url', //必填 或 要為url網址格式
  tickArea: 'required', //必填
  tickAmount: 'required|min_value:0', //必填 或 最小數字為0
  tickCount: 'required|min_value:0', //必填 或 最小數字為0
  tickStar: 'required|min_value:1|max_value:10', //必填 或 最小數字為1 最大10
  tickDescript: 'required|max:100' // 必填 最大數字長度100
};

//將驗證規則放入defineRule內 ( vee-validate是根據 defineRule內的規則來判斷一開始是沒有規則內容 )
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

//新增按鈕，第一個參數接受表單回饋資訊(promise物件)，第二個參數接受 重製表單方法
const addTicket = async (errorMes, restFn) => {
  const result = await errorMes();
  //因為套件回傳會有 true 跟 fasle，透過這些判斷即可，目前應不太需要try ..catch方式
  if (result.valid) {
    tickData.value.push(userData.value);
    //使用vue內建 newxtTick 確保 DOM 數據都更新完才去做以下
    nextTick(() => {
      restFn(); //重制表單
      userData.value = { id: tickDataLength(), ...initialData }; //重制響應式資料
    });
  }
};

//篩選修改 篩選狀態
const filterArea = (event) => {
  selectValue.value = event.target.value;
};
</script>

<template>
  <TheLayout>
    <div class="customMainView">
      <div class="customImgView">
        <img class="customLogoImg" src="./assets/images/logo.png" />
        <img class="customMainImg" src="./assets/images/main_img.png" />
      </div>
      <!-- 
        此處 v-slot內容 是 vee-validat提供的，主要放置表單回饋內容，方法 
        validate:驗證結果，會回傳一個promise物件，所以需要用 async fn去接
        resetForm:重製表單方法
      -->
      <Form class="customFormView" :validation-schema="schema" v-slot="{ resetForm, validate }">
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageName">套票名稱</label>
          <Field class="customInput" id="packageName" name="tickName" v-model="userData.tickName" />
          <ErrorMessage class="errorMessage" name="tickName" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="imgUrlName">圖片網址</label>
          <Field class="customInput" id="imgUrlName" name="tickImg" v-model="userData.tickImg" />
          <ErrorMessage class="errorMessage" name="tickImg" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="attractionAreas">景點地區</label>
          <Field
            as="select"
            class="customInput"
            id="attractionAreas"
            name="tickArea"
            v-model="userData.tickArea"
          >
            <option value="" disabled selected>請選擇景點地區</option>
            <option value="高雄">高雄</option>
            <option value="台中">台中</option>
            <option value="台北">台北</option>
          </Field>
          <ErrorMessage class="errorMessage" name="tickArea" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageAmount">套票金額</label>
          <Field
            class="customInput"
            type="number"
            min="0"
            id="packageAmount"
            name="tickAmount"
            v-model="userData.tickAmount"
          />
          <ErrorMessage class="errorMessage" name="tickAmount" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageTickets">套票組數</label>
          <Field
            class="customInput"
            type="number"
            min="0"
            id="packageTickets"
            name="tickCount"
            v-model="userData.tickCount"
          />
          <ErrorMessage class="errorMessage" name="tickCount" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabel" for="packageStar">套票星級</label>
          <Field
            class="customInput"
            type="number"
            max="10"
            min="1"
            id="packageStar"
            name="tickStar"
            v-model="userData.tickStar"
          />
          <ErrorMessage class="errorMessage" name="tickStar" />
        </div>
        <div class="flex flex-wrap">
          <label class="customLabelText" for="packageDescription">套票描述</label>
          <Field
            as="textarea"
            class="customText"
            id="packageDescription"
            name="tickDescript"
            v-model="userData.tickDescript"
          />
          <ErrorMessage class="errorMessage" name="tickDescript" />
        </div>
        <button class="formButton" @click.prevent="addTicket(validate, resetForm)">新增套票</button>
      </Form>
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
