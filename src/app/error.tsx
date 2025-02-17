'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<div className='flex flex-col bg-white/60 backdrop-blur-lg dark:bg-neutral-900/60 border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70'>
					<div className='p-4 md:p-7'>
						<p className='mt-2 text-gray-500 dark:text-white text-center'>Server is not responding</p>
					</div>
				</div>
			</main>
		</div>
	)
}
