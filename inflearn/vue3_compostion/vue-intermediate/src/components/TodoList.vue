<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

//data
const items = ref([])

// methods
function fetchTodos() {
  for (let i = 0; i < localStorage.length; i++) {
    items.value.push(localStorage.key(i))
  }
}

fetchTodos()
</script>

<style lang="scss" scoped></style>
