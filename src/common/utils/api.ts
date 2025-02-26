import { Quote } from '@/common/types/quote_types'
import { RandomQuoteRequest } from '@/common/types/request_types'
import config from '@/config'

export async function healthCheck(): Promise<boolean> {
	const response = await fetch(`${config.quotableApiUrl}/health`)
	const json = await response.json()

	return json.status === 'ok'
}

export async function randomQuote(request: RandomQuoteRequest): Promise<Quote | undefined> {
	const url = new URL(`${config.quotableApiUrl}/quotes/random`)
	const { author, query } = request

	if (author) {
		url.searchParams.append('author', author)
	}
	if (query) {
		url.searchParams.append('query', query)
	}

	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Failed to fetch quote')
	}

	const json = await response.json()

	if (!json.quote) {
		return undefined
	}

	return json.quote as Quote
}
