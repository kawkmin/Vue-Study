<template>
  <TodoHeader></TodoHeader>
  <TodoInput></TodoInput>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'

export default {
  components: {
    // 컴포넌트 이름 : 컴포넌트 내용
    TodoHeader,
    TodoInput
  }
}
</script>

<style lang="scss" scoped></style>
