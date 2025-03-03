import { getAuthorBySlug } from '@/common/utils/api'
import AuthorCard from './_components/author-card'

export default async function AuthorDetails({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const author = await getAuthorBySlug(slug)

	return (
		<div className='grow flex flex-col min-h-auto p-0 sm:p-8 xl:p-20 w-full gap-16 min-w-fit max-w-screen'>
			<main className='flex flex-col grow sm:grow-0 gap-8 items-center lg:items-start xl:items-center w-full lg:w-1/2 mx-auto rounded-none sm:rounded-md justify-center'>
				<AuthorCard author={author!} />
			</main>
		</div>
	)
}
