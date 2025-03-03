export type Tag = {
	uuid: string
	name: string
}

export type Author = {
	uuid: string
	name: string
	slug: string
	description: string
	bio: string
	link: string
	quotesCount?: number
}

export type Quote = {
	uuid: string
	content: string
	tag: Tag[]
	author: Author
}
