import { Quote } from '@/common/types/quote_types'
import config from '@/config'

export async function healthCheck(): Promise<boolean> {
	const response = await fetch(`${config.quotableApiUrl}/health`)
	const json = await response.json()

	return json.status === 'ok'
}

export async function randomQuote(): Promise<Quote> {
	const response = await fetch(`${config.quotableApiUrl}/quotes/random`)
	const json = await response.json()

	return json.quote as Quote
}
