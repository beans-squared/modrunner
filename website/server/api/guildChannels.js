export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	return await $fetch(`${config.apiUrl}/guilds/${getQuery(event).guildId}/channels`, {
		headers: {
			'x-api-key': config.apiKey,
		},
	}).catch((error) => console.error('Error while fetching guild channels from the backend:', error.data))
})
