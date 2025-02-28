import QuoteCard from '@/app/_components/quote-card'
import { healthCheck } from '@/common/utils/api'

export default async function Home() {
	await healthCheck()

	return (
		<div className='grow flex flex-col justify-center min-h-auto p-0 pb-8 lg:p-8 lg:pb-20 w-full gap-16 sm:p-20 min-w-fit max-w-screen'>
			<main className='flex flex-col gap-8 items-center lg:items-start xl:items-center w-full lg:w-1/2 mx-auto'>
				<QuoteCard />
			</main>
		</div>
	)
}
