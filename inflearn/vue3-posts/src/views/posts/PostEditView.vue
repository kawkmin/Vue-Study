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
					<template v-else> 수정 </template>
				</button>
			</template>
		</PostForm>
		<!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
		<AppAlert :items="alerts" />
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { vAlert, vSuccess } = useAlert();

const goDetailPage = () =>
	router.push({
		name: 'PostDetail',
		params: { id },
	});

const form = ref({
	title: null,
	content: null,
});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setForm(data);
	} catch (error) {
		console.log(error);
		vAlert(error.message);
	}
};
const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};
fetchPost();

const editError = ref(null);
const editLoading = ref(false);

const edit = async () => {
	try {
		editLoading.value = true;
		await updatePost(id, { ...form.value });
		// router.push({
		// 	name: 'PostDetail',
		// 	params: { id },
		// });
		// vAlert('수정이 완료되었습니다!!!', 'sucess');
		await router.push({ name: 'PostDetail', params: { id } });
		vSuccess('수정이 완료되었습니다!');
	} catch (err) {
		vAlert(err.message);
		editError.value = err;
	} finally {
		editLoading.value = false;
	}
}

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
