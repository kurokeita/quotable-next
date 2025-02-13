import { Quote } from '@/common/types/quote_types'
import { revalidatePath } from 'next/cache'

export default function QuoteCard({ quote }: { quote: Quote }) {
	async function refreshQuote() {
		'use server'
		revalidatePath('/')
	}

	return (
		<div className="flex flex-col bg-white/60 backdrop-blur-lg dark:bg-neutral-900/60 border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70 w-full sm:w-[640px]">
			<div className="p-4 md:p-7">
				<p className="mt-2 text-gray-500 dark:text-white">{quote.content}</p>
			</div>
			<div className="backdrop-blur-sm border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:border-neutral-700 group">
				<div className="flex justify-between items-center">
					<button
						onClick={refreshQuote}
						className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					>
						<svg
							className="w-4 h-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
					<p
						className="hs-collapse-toggle mt-1 text-sm text-gray-500 dark:text-white cursor-pointer peer"
						id="author-info-collapse"
						aria-expanded="false"
						aria-controls="author-info-collapse-heading"
						data-hs-collapse="#author-info-collapse-heading"
					>
						{quote.author.name}
					</p>
				</div>
				<div
					id="author-info-collapse-heading"
					className="hs-collapse hidden w-full max-h-48 transition-[height] duration-300 text-justify overflow-hidden peer-aria-expanded:overflow-y-auto"
					aria-labelledby="author-info-collapse"
				>
					<div className="mt-5">
						<p className="text-gray-500 dark:text-neutral-400">{quote.author.bio}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
