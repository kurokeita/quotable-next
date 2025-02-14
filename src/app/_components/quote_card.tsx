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
					<p
						className='hs-collapse-toggle mt-1 text-sm text-gray-500 dark:text-white cursor-pointer peer'
						id='author-description-collapse'
						aria-expanded='false'
						aria-controls='author-description-collapse-heading'
						data-hs-collapse='#author-description-collapse-heading'
					>
						{quote.author.name}
					</p>
				</div>
				<div
					id='author-description-collapse-heading'
					className='hs-collapse hidden w-full max-h-48 transition-[height] duration-300 text-justify overflow-hidden peer-aria-expanded:overflow-y-auto'
					aria-labelledby='author-description-collapse'
				>
					<div className='mt-5'>
						<p className='text-gray-500 dark:text-neutral-400'>{quote.author.description}</p>
						<div className='group'>
							<button
								type='button'
								id='author-bio-collapse'
								className='hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:outline-none focus:underline focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600'
								data-hs-collapse='#author-bio-collapse-heading'
							>
								<span className='[&.open]:hidden'>Read more</span>
								<span className='[&.open]:block hidden'>Read less</span>
								<svg
									className='transition-transform duration-300 [.open]:rotate-180 flex-shrink-0 w-4 h-4'
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='m6 9 6 6 6-6' />
								</svg>
							</button>
							<div
								id='author-bio-collapse-heading'
								className='hs-collapse hidden w-full max-h-48 transition-[height] duration-300 text-justify overflow-hidden peer-aria-expanded:overflow-y-auto author-bio-collapse-heading bio-test'
								aria-labelledby='author-bio-collapse'
							>
								<p className='text-gray-500 dark:text-neutral-400'>{quote.author.bio}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
