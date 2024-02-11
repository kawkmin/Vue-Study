<template>
  <TodoHeader></TodoHeader>
  <!-- <TodoInput @하위컴포넌트 이벤트이름="상위 컴포넌트의 메서드 이름"></TodoInput> -->
  <TodoInput @add="addTodoItem"></TodoInput>
  <!-- <TodoList :프롭스 이름="상위 컴포넌트의 데이터이름"></TodoList> -->
  <TodoList :todoItems="todoItems" @remove="removeTodoItem"></TodoList>
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

    function addTodoItem(todo) {
      todoItems.value.push(todo)
      localStorage.setItem(todo, todo)
    }

    function removeTodoItem(item, index) {
      todoItems.value.splice(index, 1)
      localStorage.removeItem(item)
    }

    return { todoItems, addTodoItem, removeTodoItem }
  }
}
</script>

<style lang="scss" scoped></style>
