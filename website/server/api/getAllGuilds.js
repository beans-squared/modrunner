export default defineEventHandler(async () => {
	const config = useRuntimeConfig()

	return await $fetch(`${config.apiUrl}/guilds`, {
		method: 'GET',
		headers: {
			'x-api-key': config.apiKey,
		},
	}).catch((error) => console.error('Error while requesting all guilds from the backend:', error))
})
