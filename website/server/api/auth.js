export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	return await $fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: config.public.discordClientId,
			client_secret: config.discordClientSecret,
			grant_type: 'authorization_code',
			code: getQuery(event).code,
			redirect_uri: `${config.public.baseUrl}/login`,
		}),
	}).catch((error) => console.error('Error while fetching access token from Discord:', error.data))
})
