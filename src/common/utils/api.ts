import { Quote } from '@/common/types/quote_types'
import config from '@/config'

export async function healthCheck(): Promise<boolean> {
	const response = await fetch(`${config.quotableApiUrl}/health`)
	const json = await response.json()

	return json.status === 'ok'
}

export async function randomQuote(author?: string, query?: string): Promise<Quote> {
	const url = new URL(`${config.quotableApiUrl}/quotes/random`)

	if (author) url.searchParams.append('author', author)
	if (query) url.searchParams.append('query', query)

	const response = await fetch(url)
	const json = await response.json()

	return json.quote as Quote
}
