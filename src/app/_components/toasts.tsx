import { ToastContentProps } from 'react-toastify'

export type ErrorToastProps = {
	message: string
}

const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
	return (
		<button
			type='button'
			className='inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white ml-3'
			aria-label='Close'
			onClick={closeToast}
		>
			<span className='sr-only'>Close</span>
			<svg
				className='shrink-0 size-4'
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
				<path d='M18 6 6 18'></path>
				<path d='m6 6 12 12'></path>
			</svg>
		</button>
	)
}

export const ErrorToast = (toastProps: ToastContentProps<{ data: ErrorToastProps }>) => {
	return (
		<div className='w-full' role='alert' tabIndex={-1} aria-labelledby='hs-toast-error'>
			<div className='flex items-center justify-between p-0'>
				<p id='hs-toast-error' className='text-sm text-gray-700 dark:text-neutral-400'>
					{toastProps.data.data.message}
				</p>
				<CloseButton closeToast={toastProps.closeToast} />
			</div>
		</div>
	)
}
