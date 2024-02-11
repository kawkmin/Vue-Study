<template>
  <div>
    <input type="text" v-model="todoInput" />
    <button @click="addTodo">추가</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//data
const todoInput = ref('')

//methods
const addTodo = () => {
  const todo = todoInput.value
  localStorage.setItem(todo, todo)
}
</script>

<style lang="scss" scoped></style>
