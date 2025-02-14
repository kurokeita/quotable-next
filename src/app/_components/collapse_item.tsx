import { ReactNode } from 'react'

type CollapseItemProps = {
	contentId: string
	title: string
	content: ReactNode | string
}

export default function CollapseItem(props: CollapseItemProps) {
	const { contentId, title, content } = props

	return (
		<>
			<button
				type='button'
				className='hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:outline-none focus:underline focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600'
				data-hs-collapse={`#${contentId}`}
			>
				{title}
				<svg
					className='hs-collapse-open:rotate-180 flex-shrink-0 w-4 h-4 text-white'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='m6 9 6 6 6-6' />
				</svg>
			</button>
			<div id={contentId} className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300'>
				<div className='mt-5'>{content}</div>
			</div>
		</>
	)
}
