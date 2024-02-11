<template>
  <div>
    <input type="text" v-model="todoInput" />
    <button @click="addTodo">추가</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

//data
const todoInput = ref('')

//methods
const addTodo = () => {
  const todo = todoInput.value
  // localStorage.setItem(todo, todo)
  //this.$emit('')
  emit('add', todo)
  clearTodo()
}

const clearTodo = () => (todoInput.value = '')
</script>

<style lang="scss" scoped></style>
