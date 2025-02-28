import QuoteCard from '@/app/_components/quote-card'
import { healthCheck } from '@/common/utils/api'

export default async function Home() {
	await healthCheck()

	return (
		<div className='grow flex flex-col justify-center min-h-auto p-0 sm:p-8 xl:p-20 w-full gap-16 min-w-fit max-w-screen'>
			<main className='flex flex-col grow sm:grow-0 gap-8 items-center lg:items-start xl:items-center w-full lg:w-1/2 mx-auto rounded-none sm:rounded-md justify-center'>
				<QuoteCard />
			</main>
		</div>
	)
}
