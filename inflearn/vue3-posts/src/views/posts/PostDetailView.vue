<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="$router.push('/posts/10')">
					이전글
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="$router.push('/posts/11')">
					다음글
				</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios.js';
import { useAlert } from '@/composables/alert.js';
import { computed, toRefs } from 'vue';
import { useNumber } from '@/composables/number.js';

const props = defineProps({
	id: [String, Number],
});
const router = useRouter();
// const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef); // composable로 넘겨도 반응형 잃지 않도록 해줌!
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);
/**
 * ref
 * 장점) 객체 할당 가능
 * 단점) .value를 써야함
 *
 * reactive
 * 장점) .value 필요없음
 * 단점) 객체 할당 불가능
 */
// const post = ref({});
// let form = reactive({});

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
const remove = async () => {
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}
	execute();
};

const goListPage = () =>
	router.push({
		name: 'PostList',
	});
const goEditPage = () =>
	router.push({
		name: 'PostEdit',
		params: { id: props.id },
	});

onBeforeRouteUpdate(() => {
	console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
	console.log('onBeforeRouteLeave');
});
</script>

<script>
export default {
	beforeRouteEnter() {
		console.log('beforeRouteEnter');
	},
};
</script>

<style lang="scss" scoped></style>
