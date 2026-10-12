import meta from '../../package.json' with { type: 'json' }
import { logger } from '../logger.js'
import { cfetch } from '../util/cfetch.js'

export const modrinth = {
	config: {
		baseUrl: 'api.modrinth.com',
		version: 'v2',
		apiKey: null,
		userAgent: `modrunner/${meta.name}-${process.env.DOPPLER_ENVIRONMENT}/${meta.version} (contact@modrunner.net)`,
		maxRetries: 3,
	},
	async baseFetch(path: string, options: RequestInit) {
		try {
			const response = await cfetch(
				`https://${this.config.baseUrl}/${this.config.version}${path}`,
				{
					headers: {
						'User-Agent': this.config.userAgent,
					},
					...options,
				},
				this.config.maxRetries,
			)
		} catch (error) {
			logger.error(`Error on Modrinth data fetch at ${options.method ?? ''} ${path}`, error)
		} finally {
			return null
		}
	},
	api: {
		async searchProjects(query: string, limit?: number) {
			return await modrinth.baseFetch(`/search?${new URLSearchParams({ query })}` + `&limit=${limit ?? 10}`, { method: 'GET' })
		},
	},
}
