<template>
	<NuxtLayout>
		<section class="error">
			<h2>{{ error.statusCode }} {{ error.statusMessage }}</h2>
			<p>{{ error.message }}</p>
			<button @click="handleError">Return Home</button>
		</section>
	</NuxtLayout>
</template>

<script setup>
const props = defineProps(['error'])

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
section.error {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: var(--font-size-3xl);
	}
}
</style>
