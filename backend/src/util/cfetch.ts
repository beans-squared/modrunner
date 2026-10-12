import { logger } from '../logger.js'

const API_MAX_RETRIES = 3

export async function cfetch(url: string, options = {}, maxRetries = API_MAX_RETRIES ?? 3): Promise<Response | null | void> {
	for (let i = maxRetries; i > 0; i--) {
		return await fetch(url, options).catch((error) => logger.error(error))
	}
	return null
}
