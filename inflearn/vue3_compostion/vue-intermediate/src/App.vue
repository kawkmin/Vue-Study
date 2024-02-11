<template>
  <TodoHeader></TodoHeader>
  <TodoInput></TodoInput>
  <!-- <TodoList :프롭스 이름="상위 컴포넌트의 데이터이름"></TodoList> -->
  <TodoList :todoItems="todoItems"></TodoList>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import { ref } from 'vue'

export default {
  components: {
    // 컴포넌트 이름 : 컴포넌트 내용
    TodoHeader,
    TodoInput,
    TodoList
  },
  setup() {
    // data
    const todoItems = ref([])

    // methods
    function fetchTodos() {
      const result = []
      for (let i = 0; i < localStorage.length; i++) {
        const todoItem = localStorage.key(i)
        // todoItems.value.push(todoItem)
        result.push(todoItem)
      }
      return result
    }

    todoItems.value = fetchTodos()

    return { todoItems }
  }
}
</script>

<style lang="scss" scoped></style>
