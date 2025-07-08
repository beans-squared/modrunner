<template>
	<section class="post-grid">
		<h1>Latest Blog Posts</h1>
		<div v-for="article in posts" :key="article._path">
			<NuxtLink :to="article._path">
				<div class="post">
					<img v-if="article.thumbnail" :src="article.thumbnail" alt="" />
					<div class="text">
						<h2>{{ article.title }}</h2>
						<i>{{ $dayjs.utc(article.date).format('MMMM D, YYYY') }}</i>
						<p>{{ article.description }}</p>
					</div>
				</div>
			</NuxtLink>
		</div>
	</section>
</template>

<script setup>
useHead({ title: 'Blog' })

const posts = await queryContent('blog').sort({ date: -1 }).find()
</script>

<style scoped lang="scss">
section.post-grid {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 1280px;
	margin: 0 auto 0 auto;

	h1 {
		font-size: var(--font-size-2extralarge);
		margin-bottom: 0.5rem;
	}

	a {
		color: var(--color-text);
	}

	div.post {
		border-top: 1px solid gray;
		display: flex;
		gap: 1rem;
		height: 100%;
		padding: 1rem;

		img {
			max-height: 8rem;
			border-radius: 10px;
			box-shadow: 0 0 10px 0 black;
		}

		div.text {
			h2 {
				margin: 0;
			}
		}
	}
}
</style>
