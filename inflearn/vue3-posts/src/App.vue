<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import { useAlert } from '@/composables/alert.js';

const { alerts } = useAlert();
</script>

<template>
	<TheHeader></TheHeader>

	<TheView></TheView>

	<AppAlert />
</template>

<style lang="scss" scoped></style>
