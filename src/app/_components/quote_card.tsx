'use client'

import { initPreline } from '@/app/_components/preline_script'
import { Quote } from '@/common/types/quote_types'
import { errorToast } from '@/common/utils/notify'
import { useEffect, useState } from 'react'

export default function QuoteCard() {
	const [quote, setQuote] = useState<Quote>()

	const fetchQuote = async function () {
		const res = await fetch('/api/quotes/random')

		if (!res.ok) {
			errorToast('Failed to fetch quote')
			setQuote(undefined)

			return
		}

		const data: Quote = await res.json()
		setQuote(data)
	}

	useEffect(() => {
		fetchQuote()
	}, [])

	useEffect(() => {
		if (quote) {
			initPreline()
		}
	}, [quote])

	if (!quote) {
		return (
			<div className='flex flex-col w-full sm:w-[640px] animate-pulse bg-white/60 backdrop-blur-lg dark:bg-neutral-900/60 border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70'>
				<div className='p-4 md:p-7'>
					<p className='mt-2 w-w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700' />
				</div>

				<div className='backdrop-blur-sm border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:border-neutral-700 group'>
					<div className='justify-items-end'>
						<p className='mt-2 w-1/3 h-4 bg-gray-200 rounded-full dark:bg-neutral-700' />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-white/60 backdrop-blur-lg dark:bg-neutral-900/60 border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70 w-full sm:w-[640px]'>
			<div className='p-4 md:p-7'>
				<p className='mt-2 text-gray-500 dark:text-white'>{quote.content}</p>
			</div>
			<div className='backdrop-blur-sm border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:border-neutral-700 group'>
				<div className='flex justify-between items-center'>
					<div className='hs-accordion-group w-full'>
						<div className='w-full hs-accordion active' id='hs-basic-nested-heading-one'>
							<div className='flex justify-between items-center'>
								<button
									onClick={fetchQuote}
									className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
								>
									<svg
										className='w-4 h-4'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={2}
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
										/>
									</svg>
								</button>
								<button
									className='hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 font-semibold text-end text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400'
									aria-expanded='true'
									aria-controls='hs-basic-nested-collapse-one'
								>
									{quote.author.name}
								</button>
							</div>
							<div
								id='hs-basic-nested-collapse-one'
								className='hs-accordion-content mt-2 w-full overflow-hidden transition-[height] duration-300'
								role='region'
								aria-labelledby='hs-basic-nested-heading-one'
							>
								<div className='hs-accordion-group px-0'>
									<div className='hs-accordion active' id='hs-basic-nested-sub-heading-one'>
										<p>{quote.author.description}</p>
										<button
											className='hs-accordion-toggle py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400'
											aria-controls='hs-basic-nested-sub-collapse-one'
										>
											<span className='hs-accordion-active:hidden text-blue-600 dark:text-blue-500'>More</span>
											<span className='hidden hs-accordion-active:block text-gray-800 dark:text-neutral-400'>Less</span>
										</button>
										<div
											id='hs-basic-nested-sub-collapse-one'
											className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
											role='region'
											aria-labelledby='hs-basic-nested-sub-heading-one'
										>
											<p className='text-gray-800 dark:text-neutral-200'>{quote.author.bio}</p>
											<a href={quote.author.link} className='text-blue-600 decoration-blue-500 dark:text-blue-500'>
												{quote.author.link}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
