'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { IStaticMethods } from 'preline/preline'
declare global {
	interface Window {
		HSStaticMethods: IStaticMethods
	}
}

export async function initPreline() {
	if (typeof window !== 'undefined') {
		await import('preline/preline')
		window.HSStaticMethods.autoInit()
	}
}

export default function PrelineScript() {
	const path = usePathname()

	useEffect(() => {
		initPreline()
	}, [path])

	return null
}
