<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ content }}
		</p>
		<p class="text-muted">{{ createDate }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-0" @click.stop="$emit('modal')">
					<i class="bi bi-emoji-smile"></i>
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
import AppCard from '../app/AppCard.vue';
import { computed, inject } from 'vue';
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number], // 셋 중 아무거나
	},
});
defineEmits(['modal']);
const dayjs = inject('dayjs');
const createDate = computed(() => dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'));
</script>

<style lang="scss" scoped></style>
