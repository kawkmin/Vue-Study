<template>
	<div class="card" style="width: 18rem">
		<div class="card-body">
			<h5 class="card-title">{{ title }}</h5>
			<p class="card-text">
				{{ content }}
			</p>
			<p class="text-muted">{{ createdAt }}</p>
		</div>
	</div>
</template>

<script setup>
defineProps({
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
</script>

<style lang="scss" scoped></style>
