import AuthorsTable from '@/app/authors/_components/authors-table'
import { Card } from '@/components/ui/card'

export default function AuthorsPage() {
	return (
		<div className='grow flex flex-col justify-center items-center min-h-auto p-0 pb-8 lg:p-8 lg:pb-20 w-full gap-16 sm:p-20 max-w-screen'>
			<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full border-transparent text-current'>
				<AuthorsTable />
			</Card>
		</div>
	)
}
