'use client'
import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import CanvasCursor from '@/components/ui/canvas-cursor'
import { Ripple } from '@/components/ui/ripple'
import { Metadata } from 'next'
import { Roboto_Flex, Roboto_Mono } from 'next/font/google'
import { useEffect } from 'react'

const robotoFlex = Roboto_Flex({
	subsets: ['latin'],
})

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Quotable',
	description: 'A demo for the Quotble API (https://api.quotable.kurokeita.dev)',
}

export default function GlobalError({
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
		<html lang='en' className='dark'>
			<head>
				<link rel='icon' href='/icon?<generated>' type='image/png' sizes='32x32' />
			</head>
			<body
				className={`${robotoFlex.className} ${robotoMono.className} min-w-fit w-full min-h-screen flex flex-col justify-between text-white`}
			>
				<CanvasCursor />
				<Ripple
					mainCircleOpacity={0.5}
					numCircles={12}
					className='fixed z-0 h-full w-full flex-col items-center justify-center overflow-hidden bg-background'
				/>
				<Header />
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='flex flex-col p-8 blur-background rounded-xl'>
						<h2 className='text-xl font-semibold mb-4 text-center'>Something went wrong</h2>
						<p className='text-center mb-6'>{error.message}</p>
						<button className='cursor-pointer mx-auto underline' onClick={reset}>
							Try again
						</button>
					</div>
				</div>
				<Footer />
			</body>
		</html>
	)
}
