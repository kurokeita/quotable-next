export type RandomQuoteRequest = {
	author?: string
	query?: string
}

export type FetchQuotesRequest = RandomQuoteRequest & {
	limit?: 10 | 25 | 50 | 100
	page?: number
}

export type FetchAuthorsRequest = {
	order?: 'asc' | 'desc'
	sortBy?: 'name' | 'dateAdded' | 'dateModified' | 'quotesCount'
	limit?: 10 | 25 | 50 | 100
	page?: number
}
