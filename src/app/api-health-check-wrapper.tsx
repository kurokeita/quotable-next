'use client'

import { healthCheck } from '@/common/utils/api'
import { useEffect, useState } from 'react'

export default function ApiHealthCheckWrapper({ children }: { children: React.ReactNode }) {
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const checkApiHealth = async () => {
			try {
				await healthCheck()
			} catch (err) {
				setError(err as Error)
				console.error('API Health Check failed:', err)
			}
		}

		checkApiHealth()
	}, [])

	// If there's an error, throw it so it can be caught by the error boundary
	if (error) {
		throw error
	}

	return children
}
