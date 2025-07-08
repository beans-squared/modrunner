<template>
	<NuxtLayout>
		<NuxtPage />
		<Toaster position="bottom-right" theme="dark" richColors />
	</NuxtLayout>
</template>

<script setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} • Modrunner` : 'Modrunner'
	},
})
</script>
