<template>
	<section class="post">
		<ContentDoc v-slot="{ doc }">
			<h1 class="post-title">{{ doc.title }}</h1>
			<img v-if="doc.thumbnail" :src="doc.thumbnail" alt="" />
			<div class="post-meta">
				<img class="post-author-avatar" :src="authorData(doc.author).avatar" alt="" />
				<div>
					<span class="post-author">
						<NuxtLink class="post-author-name" :to="authorData(doc.author).github">{{ authorData(doc.author).name }}</NuxtLink> -
						{{ authorData(doc.author).role }}
					</span>
					<i class="post-date">{{ $dayjs.utc(doc.date).format('MMMM D, YYYY') }}</i>
				</div>
			</div>
			<hr />
			<ContentRenderer :value="doc" />
		</ContentDoc>
	</section>
</template>

<script setup>
function authorData(authorName) {
	switch (authorName) {
		case 'beansquared': {
			return {
				name: 'beansquared',
				role: 'Lead Developer',
				avatar: 'https://avatars.githubusercontent.com/u/65502593?v=4',
				github: 'https://github.com/smcmo',
			}
		}
		default: {
			return {
				name: 'Modrunner Team',
				role: 'Admin',
				avatar: 'https://cdn.discordapp.com/avatars/978413985722404924/dd5ed95724a0946f97f4917ae978dd96.webp',
				github: 'https://github.com/modrunner',
			}
		}
	}
}
</script>

<style lang="scss">
section.post {
	max-width: 960px;
	margin: 0 auto;

	h1.post-title {
		font-size: var(--font-size-3extralarge);
		margin: 1rem 0;
	}

	h2.post-date {
		font-size: var(--font-size-medium);
		font-weight: var(--font-weight-normal);
	}

	div.post-meta {
		display: flex;
		gap: 1rem;
		margin: 1rem 0;

		img.post-author-avatar {
			border-radius: 50%;
			box-shadow: none;
			height: 3.5rem;
		}

		div {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.post-author-name {
				font-weight: var(--font-weight-bold);
			}
		}
	}

	h2 a,
	h3 a {
		color: var(--color-text);
	}

	img {
		border-radius: 10px;
		box-shadow: 0 0 10px 0 black;
		max-width: 100%;
	}
}
</style>
