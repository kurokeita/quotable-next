import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='z-10 w-full bg-black/15 backdrop-blur-xl drop-shadow-md border-transparent text-current'>
			<div className='flex justify-between'>
				<div className='flex items-center'>
					<p className='text-xs p-2'>
						<span>Built using </span>
						<Link href='https://nextjs.org' className='underline' target='_blank'>
							Next.js
						</Link>
						<span>, </span>
						<Link href='https://ui.shadcn.com' className='underline' target='_blank'>
							shadcn
						</Link>
						<span>. The source code is available on </span>
						<Link href='https://github.com/kurokeita/quotable-next' className='underline' target='_blank'>
							GitHub
						</Link>
						<span>.</span>
					</p>
				</div>
				<div className='flex items-center'>
					<p className='text-xs p-2'>
						<span>@ 2024 Quotable</span>
					</p>
				</div>
			</div>
		</footer>
	)
}
