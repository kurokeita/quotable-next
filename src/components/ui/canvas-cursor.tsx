'use client'

import useCanvasCursor from '@/components/hooks/use-canvas-cursor'

const CanvasCursor = () => {
	useCanvasCursor()

	return <canvas className='pointer-events-none fixed inset-0 z-99' id='canvas' />
}
export default CanvasCursor
