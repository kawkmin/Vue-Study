<template>
  <TodoHeader :appTitile="title"></TodoHeader>
  <!-- <TodoInput @하위컴포넌트 이벤트이름="상위 컴포넌트의 메서드 이름"></TodoInput> -->
  <TodoInput @add="addTodoItem"></TodoInput>
  <!-- <TodoList :프롭스 이름="상위 컴포넌트의 데이터이름"></TodoList> -->
  <TodoList :todoItems="todoItems" @remove="removeTodoItem"></TodoList>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import { onBeforeMount, onMounted, ref } from 'vue'

export default {
  components: {
    // 컴포넌트 이름 : 컴포넌트 내용
    TodoHeader,
    TodoInput,
    TodoList
  },

  data() {
    return {
      title: '할일 앱'
    }
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

    // 라이프 사이클 API가 적용된 구간 (created,BeforeMouted )
    // todoItems.value = fetchTodos()

    console.log('1 : setup called') // 1

    // 라이프 사이클 API
    onBeforeMount(() => {
      console.log('2 : onBeforeMount called') // 2
      todoItems.value = fetchTodos()
    })

    onMounted(() => {
      console.log('3 : onMounted called') // 3
    })

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
