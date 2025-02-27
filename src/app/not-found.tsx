import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center px-4 text-center max-w-fit mx-auto grow'>
			<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full border-transparent text-current max-w-screen'>
				<CardHeader>
					<h1 className='text-6xl font-bold mb-4'>404</h1>
					<h2 className='text-2xl mb-6'>Page Not Found</h2>
				</CardHeader>
				<CardContent className='flex flex-col justify-center gap-4'>
					<p className='mb-8'>The page you are looking for doesn&apos;t exist or has been moved.</p>
					<div className='flex justify-center w-1/2 mx-auto gap-4'>
						<Button asChild className='cursor-pointer'>
							<Link href='/'>Return Home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
