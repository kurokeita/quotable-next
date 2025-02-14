import { ErrorToast } from '@/app/_components/toasts'
import { toast } from 'react-toastify'

export function errorToast(message: string) {
	toast.error(ErrorToast, {
		data: { data: { message } },
		className:
			'bg-white/60 backdrop-blur-lg dark:bg-neutral-900/60 border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70',
		autoClose: 3000,
		closeButton: false,
	})
}
