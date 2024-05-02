<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 수정</template>
				</button>
			</template>
		</PostForm>
		<!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
		<AppAlert :items="alerts" />
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';
import { useAxios } from '@/hooks/useAxios.js';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { vAlert, vSuccess } = useAlert();

const goDetailPage = () =>
	router.push({
		name: 'PostDetail',
		params: { id },
	});

const { data: form, error, loading } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('수정이 완료되었습니다!');
			router.push({ name: 'PostDetail', params: { id } });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
const edit = () => {
	execute({
		...form.value,
	});
};
//alert
// const showAlert = ref(false);
// const alertMessage = ref('');
// const alertType = ref('error');
// const alerts = ref([]);
// const vAlert = (message, type = 'error') => {
// 	alerts.value.push({ message, type }),
// 		// showAlert.value = true;
// 		// alertMessage.value = message;
// 		// alertType.value = type;
// 		setTimeout(() => {
// 			// showAlert.value = false;
// 			alerts.value.shift(); // 앞에서부터 삭제 queue.poll()같은듯?
// 		}, 2000);
// };
</script>

<style lang="scss" scoped></style>
