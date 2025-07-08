export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	let response = {
		data: {
			stats: {
				servers: 0,
				projects: 0,
				uptime: 0,
			},
		},
	}
	try {
		response = $fetch(`${config.apiUrl}/stats`, {
			headers: {
				'x-api-key': config.apiKey,
			},
		})
	} catch (error) {
		console.error('Error while fetching bot statistics from the backend:', error)
	}

	return response
})
