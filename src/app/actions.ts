'use server'

import { Quote } from '@/common/types/quote_types'

export async function fetchRandomQuote(): Promise<Quote> {
	const response = await fetch('/api/quotes/random')

	debugger

	if (!response.ok) {
		throw new Error('Failed to fetch quote')
	}

	const data: Quote = await response.json()
	return data
}
