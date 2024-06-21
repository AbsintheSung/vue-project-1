<script setup>
const props = defineProps({
  tickData: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
</script>

<template>
  <ul class="cardsList">
    <li class="card" v-for="item in props.tickData" :key="item.id">
      <div class="cardHeader">
        <span class="cardBadgeTop">{{ item.tickArea }}</span>
        <img :src="item.tickImg" />
        <span class="cardBadgeBottom">{{ item.tickStar }}</span>
      </div>
      <div>
        <h3 class="cardTitle">{{ item.tickName }}</h3>
        <p class="cardContent">
          {{ item.tickDescript }}
        </p>
      </div>
      <div class="cardFooter">
        <p class="cardAmount">剩下最後 {{ item.tickCount }} 組</p>
        <p class="cardCurrency">${{ item.tickAmount }}</p>
      </div>
    </li>
  </ul>
</template>

<style></style>
