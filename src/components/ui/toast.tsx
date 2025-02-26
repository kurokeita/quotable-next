'use client'

import { toast as sonnerToast } from 'sonner'

interface ToastProps {
	id: string | number
	title: string
	description: string
	button: {
		label: string
		onClick?: () => void
	}
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
	const { title, description, button, id } = props

	return (
		<div className='flex rounded-lg bg-red-800/50 border-red-500 border backdrop-blur-xs shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4'>
			<div className='flex flex-1 items-center'>
				<div className='w-full'>
					<p className='text-sm font-medium text-gray-900'>{title}</p>
					<p className='mt-1 text-sm text-gray-500'>{description}</p>
				</div>
			</div>
			<div className='ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden'>
				<button
					className='rounded bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-100'
					onClick={() => {
						button.onClick?.()
						sonnerToast.dismiss(id)
					}}
				>
					{button.label}
				</button>
			</div>
		</div>
	)
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast(toast: Omit<ToastProps, 'id'>) {
	return sonnerToast.custom(
		(id) => (
			<Toast
				id={id}
				title={toast.title}
				description={toast.description}
				button={{
					label: toast.button.label,
					onClick: toast.button.onClick,
				}}
			/>
		),
		{
			duration: Infinity,
		},
	)
}
