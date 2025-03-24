import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ClipboardCopy, SquareCode } from 'lucide-react'
import { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)

export default function RawDataDialog<T>({
	data,
	tooltip,
}: {
	data: T
	tooltip?: string
}) {
	const [isCopied, setIsCopied] = useState(false)

	const copyToClipboard = () => {
		const jsonString = JSON.stringify(data, null, 2)
		navigator.clipboard.writeText(jsonString).then(
			() => {
				setIsCopied(true)
			},
			(err) => {
				console.error('Could not copy text: ', err)
			},
		)
	}

	return (
		<Dialog onOpenChange={() => setIsCopied(false)}>
			<DialogTrigger className='cursor-pointer'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<SquareCode size={30} strokeWidth={1} />
						</TooltipTrigger>
						<TooltipContent>{tooltip ?? 'Raw data'}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DialogTrigger>
			<DialogContent
				className='blur-background overflow-auto max-h-screen min-w-screen lg:max-h-3/4 lg:min-w-3/4 p-0 border-0'
				overlayClassName='bg-black/25 backdrop-blur-xl'
				closeButtonClassName='block lg:hidden text-white'
			>
				<VisuallyHidden>
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
				</VisuallyHidden>
				<div className='flex flex-col overflow-auto'>
					{/* Workaround for preventing triggering tooltip on opening the dialog */}
					<input className='size-0' name='disable-tooltip-focus' />
					<div className='flex justify-start blur-color p-2 lg:p-4'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={copyToClipboard}
										className='p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors'
									>
										<ClipboardCopy
											size={18}
											strokeWidth={1.5}
											className={isCopied ? 'text-[rgb(152,195,121)]' : 'text-white'}
										/>
									</button>
								</TooltipTrigger>
								<TooltipContent>{isCopied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<SyntaxHighlighter
						language='json'
						wrapLongLines={true}
						showLineNumbers={true}
						style={atomOneDarkReasonable}
						customStyle={{
							fontSize: '14px',
							backgroundColor: 'var(--blur-color)',
							padding: '10px',
						}}
					>
						{JSON.stringify(data, null, 2)}
					</SyntaxHighlighter>
				</div>
			</DialogContent>
		</Dialog>
	)
}
