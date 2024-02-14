<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input v-model="title" type="text" class="form-controller" />
			</div>
			<div class="col-3">
				<select class="form-select" v-model="limit">
					<option value="3">3개씩 보기</option>
					<option value="6">6개씩 보기</option>
					<option value="9">9개씩 보기</option>
				</select>
			</div>
		</div>
	</form>
</template>

<script setup>
const title = defineModel('title');
const limit = defineModel('limit');
// defineProps({
// 	title: String,
// 	limit: Number,
// });
// defineEmits('update:title', 'update:limit');
</script>

<style lang="scss" scoped></style>
