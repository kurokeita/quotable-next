import { Author } from '@/common/types/quotable'

export type FetchAuthorsResponse = {
	data: Author[]
	metadata: {
		total: number
		page: number
		lastPage: number
		hasNextPage: boolean
		hasPreviousPage: boolean
	}
}
