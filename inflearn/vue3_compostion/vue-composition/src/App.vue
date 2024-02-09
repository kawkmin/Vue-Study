<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">change</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // data() {
  //   return {
  //     message: 'hello'
  //   }
  // },
  setup() {
    //data
    const message = ref('hello')

    //methods
    function changeMessage() {
      message.value = 'hi'
    }

    return { message, changeMessage }
  }
  // methods: {
  //   changeMessage() {
  //     this.message = 'hi'
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
