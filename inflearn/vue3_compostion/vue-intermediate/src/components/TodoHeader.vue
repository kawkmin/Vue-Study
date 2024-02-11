<template>
  <h1>{{ appTitile }}</h1>
  <h4>{{ newTitle }}</h4>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['appTitile'])

const newTitle = computed(() => {
  return props.appTitile + '!!'
})
</script>

<style lang="scss" scoped></style>
