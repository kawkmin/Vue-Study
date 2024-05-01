<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				v-color="'blue'"
				v-focus
				v-model="title"
				type="text"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				v-model="content"
				class="form-control"
				id="content"
				rows="3"
			></textarea>
		</div>
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
// const vFocus = {
// 	mounted: el => {
// 		el.focus();
// 	},
// };
// 3.4버전 이후 Multiple v-model
const title = defineModel('title');
const content = defineModel('content');

// 이전 버전의 Multiple v-model
// defineProps({
// 	title: String,
// 	content: String,
// });
// defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>
