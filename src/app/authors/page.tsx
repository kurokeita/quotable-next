import AuthorsTable from '@/app/authors/_components/authors-table'
import { Card } from '@/components/ui/card'

export default function AuthorsPage() {
	return (
		<div className='grow flex flex-col justify-center items-center min-h-auto p-0 sm:p-8 xl:p-20 w-full gap-16 max-w-screen'>
			<Card className='blur-background w-full rounded-none sm:rounded-md'>
				<AuthorsTable />
			</Card>
		</div>
	)
}
