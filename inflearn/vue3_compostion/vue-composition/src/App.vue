<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">change</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMessage } from './hooks/useMessage'

export default {
  // data() {
  //   return {
  //     message: 'hello'
  //   }
  // },
  setup() {
    const { message, changeMessage } = useMessage()

    return { message, changeMessage }
    //data
    // const message = ref('hello')
    // //methods
    // function changeMessage() {
    //   message.value = 'hi'
    // }
  }
  // methods: {
  //   changeMessage() {
  //     this.message = 'hi'
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
