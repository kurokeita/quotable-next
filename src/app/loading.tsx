import { Card, CardContent } from '@/components/ui/card'
import { LoaderCircle } from 'lucide-react'

export default function Loading() {
	return (
		<div className='grow flex flex-col justify-center items-center min-h-auto p-0 pb-8 lg:p-8 lg:pb-20 w-full gap-16 sm:p-20 min-w-fit'>
			<Card className='blur-background w-full max-w-fit'>
				<CardContent>
					<LoaderCircle className='animate-spin' size={45} />
				</CardContent>
			</Card>
		</div>
	)
}
