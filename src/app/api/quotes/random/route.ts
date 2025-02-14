import { RandomQuoteRequest } from '@/common/types/request_types'
import { randomQuote } from '@/common/utils/api'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const author = searchParams.get('author') ?? undefined
	const query = searchParams.get('query') ?? undefined

	const getRandomQuoteRequest: RandomQuoteRequest = { author, query }

	const quote = await randomQuote(getRandomQuoteRequest)

	return Response.json(quote)
}
