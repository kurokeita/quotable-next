import Header from '@/app/_components/header'
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
	title: 'Quotable UI',
	description: 'A demo for the Quotble API (https://api.quotable.kurokeita.dev)',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body className={`${robotoFlex.className} ${robotoMono.className} min-w-fit w-full min-h-screen flex flex-col`}>
				<div className='fixed inset-0 bg-[url(/assets/background.jpg)] bg-cover bg-center bg-fixed bg-no-repeat bg-black/70 bg-blend-hard-light z-0' />
				<Header />
				{children}
				<Toaster position='top-right' closeButton richColors theme='dark' />
			</body>
		</html>
	)
}
