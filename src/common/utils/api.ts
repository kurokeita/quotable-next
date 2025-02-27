import { Quote } from '@/common/types/quotable'
import { FetchAuthorsRequest, RandomQuoteRequest } from '@/common/types/requests'
import { FetchAuthorsResponse } from '@/common/types/response'
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

export async function fetchAuthors(request: FetchAuthorsRequest): Promise<FetchAuthorsResponse> {
	const url = new URL(`${config.quotableApiUrl}/authors`)

	url.searchParams.append('order', request.order ?? 'asc')
	url.searchParams.append('sortBy', request.sortBy ?? 'name')
	url.searchParams.append('limit', request.limit?.toString() ?? '10')
	url.searchParams.append('page', request.page?.toString() ?? '0')

	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Failed to fetch quote')
	}

	return (await response.json()) as FetchAuthorsResponse
}
