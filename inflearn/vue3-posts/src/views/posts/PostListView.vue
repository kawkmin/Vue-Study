<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>
		<hr class="my-4" />
		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					></PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios.js';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: null,
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });
//pagination
const totalCount = computed(() => response.value.headers['x-total-count']);

const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	try {
		loading.value = true;
		const { data, headers } = await getPosts(params.value); // Promis 대신 asyn,await 사용
		console.dir(data); // 객체 로그는 dir이 편함
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
};
fetchPosts();
watchEffect(fetchPosts); //watch()에서 기본 1번 실행하는 watch. fetchPosts에서 반응형 변경 확인
const goPage = id => {
	// 경로로 이동
	// router.push(`/posts/${id}`);

	// 이름으로 이동
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		// 쿼리 해쉬도 가능
		// query: {
		// 	searchText: 'hello',
		// },
		// hash: '#world!',
	});
};
// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
