'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='flex flex-col grow items-center justify-center gap-16'>
			<div className='flex flex-col p-8 blur-background rounded-xl'>
				<h2 className='text-xl font-semibold mb-4 text-center'>Something went wrong</h2>
				<p className='text-center mb-6'>{error.message}</p>
				<button className='cursor-pointer mx-auto underline' onClick={reset}>
					Try again
				</button>
			</div>
		</div>
	)
}
