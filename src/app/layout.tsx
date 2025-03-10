import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import CanvasCursor from '@/components/ui/canvas-cursor'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Roboto_Flex, Roboto_Mono } from 'next/font/google'
import './globals.css'

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
				<div className='fixed inset-0 bg-[url(/assets/background.jpg)] bg-cover bg-center bg-fixed bg-no-repeat bg-black/70 bg-blend-hard-light z-0' />
				<Header />
				{children}
				<Toaster position='top-right' closeButton richColors theme='dark' />
				<Footer />
			</body>
		</html>
	)
}
