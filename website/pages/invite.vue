<template></template>

<script setup>
const config = useRuntimeConfig()

await navigateTo(
	`https://discord.com/api/oauth2/authorize?client_id=${config.public.discordClientId}&permissions=2048&redirect_uri=${encodeURI(
		`${config.public.baseUrl}/login`
	)}&scope=bot%20applications.commands`,
	{
		external: true,
		open: {
			target: '_blank',
		},
	}
)
</script>
