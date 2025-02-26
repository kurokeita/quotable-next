import { Toaster } from '@/components/ui/sonner'
import { Quote } from 'lucide-react'
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
			<body className={`${robotoFlex.className} ${robotoMono.className} min-w-fit w-full`}>
				<div className='fixed inset-0 bg-[url(/assets/background.jpg)] bg-cover bg-center bg-fixed bg-no-repeat bg-black/70 bg-blend-hard-light z-0' />
				<div className='z-10 w-full bg-black/15 backdrop-blur-xl drop-shadow-md border-transparent min-h-5 text-black'>
					<div className='mx-auto w-1/2 p-4 flex items-center gap-4 justify-center'>
						<Quote fill='text-current' size={30} className='hidden lg:block' />
						<p className='text-center text-bold text-5xl'>Quotable UI</p>
					</div>
				</div>
				{children}
				<Toaster position='top-right' closeButton richColors theme='dark' />
			</body>
		</html>
	)
}
