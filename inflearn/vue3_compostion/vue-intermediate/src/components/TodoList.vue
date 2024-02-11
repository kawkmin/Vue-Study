<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

//data
const items = ref(['애플', '삼성', '인프런'])
</script>

<style lang="scss" scoped></style>
