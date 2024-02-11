<template>
  <ul>
    <li v-for="(item, index) in todoItems" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
// import { ref } from 'vue'

defineProps(['todoItems'])

// //data
// const items = ref([])

// // methods
// function fetchTodos() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const newLocal = localStorage.key(i)
//     items.value.push(newLocal)
//   }
// }

// fetchTodos()
</script>

<style lang="scss" scoped></style>
