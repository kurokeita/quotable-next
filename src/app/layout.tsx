import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import CanvasCursor from '@/components/ui/canvas-cursor'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Roboto_Flex, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { Ripple } from '@/components/ui/ripple'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<head>
				<link rel='icon' href='/icon?<generated>' type='image/png' sizes='32x32' />
			</head>
			<body
				className={`${robotoFlex.className} ${robotoMono.className} min-w-fit w-full min-h-screen flex flex-col text-black`}
			>
				<CanvasCursor />
				<Ripple
					mainCircleOpacity={0.5}
					numCircles={12}
					className='fixed z-0 h-full w-full flex-col items-center justify-center overflow-hidden bg-background'
				/>
				<Header />
				{children}
				<Toaster position='top-right' closeButton richColors theme='dark' />
				<Footer />
			</body>
		</html>
	)
}
