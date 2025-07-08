export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	return await $fetch(`${config.apiUrl}/guilds/${getQuery(event).guildId}`, {
		headers: {
			'x-api-key': config.apiKey,
		},
	}).catch((error) => console.error('Error while fetching guild data from the backend:', error.data))
})
