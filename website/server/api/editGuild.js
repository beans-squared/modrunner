export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)
	const query = getQuery(event)

	const res = await $fetch.raw(`${config.apiUrl}/guilds/${query.guildId}`, {
		method: 'PATCH',
		headers: {
			'x-api-key': config.apiKey,
		},
		body,
		ignoreResponseError: true,
	})

	setResponseStatus(event, res.status)
	event.node.res.end()
})
