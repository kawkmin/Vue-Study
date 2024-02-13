<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>
		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const fetchPosts = async () => {
	try {
		const { data } = await getPosts(); // Promis 대신 asyn,await 사용
		console.dir(data); // 객체 로그는 dir이 편함
		posts.value = data;
	} catch (error) {
		console.log(error);
	}
};
fetchPosts();

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
</script>

<style lang="scss" scoped></style>
