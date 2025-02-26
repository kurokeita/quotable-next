import QuoteCard from '@/app/_components/quote_card'
import { healthCheck } from '@/common/utils/api'

export default async function Home() {
	await healthCheck()

	return (
		<div className='grid justify-items-center min-h-auto p-0 pb-8 lg:p-8 lg:pb-20 w-full gap-16 sm:p-20 min-w-fit'>
			<main className='flex flex-col row-start-1 md:row-start-2 xl:row-start-3 2xl:row-start-5 gap-8 items-center lg:items-start xl:items-center w-full lg:w-1/2 mx-auto'>
				<QuoteCard />
			</main>
		</div>
	)
}
