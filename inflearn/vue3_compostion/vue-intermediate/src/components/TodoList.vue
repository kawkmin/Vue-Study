<template>
  <ul>
    <li v-for="(item, index) in todoItems" :key="index">
      <span>{{ item }}</span>
      <button @click="removeTodo(item, index)">삭제</button>
    </li>
  </ul>
</template>

<script setup>
// import { ref } from 'vue'

defineProps(['todoItems'])
const emit = defineEmits(['remove'])

function removeTodo(item, index) {
  emit('remove', item, index)
}

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
