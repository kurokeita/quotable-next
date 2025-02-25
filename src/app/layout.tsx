import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
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
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className='fixed inset-0 bg-[url(/assets/background.jpg)] bg-cover bg-center bg-fixed bg-no-repeat bg-black/70 bg-blend-hard-light -z-10' />
				{children}
				<Toaster position='top-right' closeButton richColors theme='dark' />
			</body>
		</html>
	)
}
