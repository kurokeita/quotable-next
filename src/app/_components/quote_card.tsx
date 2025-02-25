'use client'

import { Quote } from '@/common/types/quote_types'
import { randomQuote } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionItem } from '@radix-ui/react-accordion'
import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)

export default function QuoteCard() {
	const [quote, setQuote] = useState<Quote | undefined>(undefined)
	const [isBioShown, setIsBioShown] = useState(false)
	const [authorAccordion, setAuthorAccordion] = useState<string>('')

	const fetchQuote = async function () {
		setAuthorAccordion('')
		try {
			const res = await randomQuote({})
			setQuote(res)
		} catch {
			errorToast('Failed to fetch quote')
			setQuote(undefined)
		}
	}

	const toggleBio = () => {
		setIsBioShown(!isBioShown)
	}

	useEffect(() => {
		fetchQuote()
	}, [])

	if (!quote) {
		return (
			<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full sm:w-[640px] border-transparent'>
				<CardContent className='p-4 md:p-7 backdrop-blur-sm'>
					<Skeleton className='w-full h-[20px] rounded-full' />
				</CardContent>
				<CardFooter className='backdrop-blur-sm'>
					<Skeleton className='w-full h-[20px] rounded-full' />
				</CardFooter>
			</Card>
		)
	}

	return (
		<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full border-transparent text-black'>
			<CardHeader className='justify-center'>
				<div className='w-full'>
					<p className='text-center'>{quote?.content}</p>
				</div>
			</CardHeader>
			<CardFooter className='pb-0'>
				<Accordion
					type='single'
					className='w-full pb-0'
					collapsible
					value={authorAccordion}
					onValueChange={setAuthorAccordion}
				>
					<AccordionItem value='author-name'>
						<div className='flex w-full justify-between'>
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger
										className='bg-transparent shadow-none hover:bg-transparent [&:hover>svg]:animate-spin'
										onClick={fetchQuote}
									>
										<RefreshCw size={20} />
									</TooltipTrigger>
									<TooltipContent>
										<p>Fetch new quote</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<AccordionTrigger className='justify-end [&>svg]:hidden'>{quote.author.name}</AccordionTrigger>
						</div>
						<AccordionContent className='pb-0'>
							<Accordion type='single' collapsible>
								<AccordionItem value='author-bio'>
									<div className='flex w-full justify-between'>
										<div className='flex items-center'>
											<p>{quote.author.description}</p>
										</div>
										<AccordionTrigger onClick={toggleBio} className='[&>svg]:text-current'>
											{isBioShown ? 'Less' : 'More'}
										</AccordionTrigger>
									</div>
									<AccordionContent className='pb-0'>
										<div className='w-full'>
											<p>{quote.author.bio}</p>
										</div>
										<div className='w-full'>
											<a href={quote.author.link} className='underline'>
												{quote.author.link}
											</a>
										</div>
										<div className='w-full'>
											<Accordion type='single' collapsible>
												<AccordionItem value='author-raw'>
													<AccordionTrigger className='[&>svg]:text-current'>Raw Data</AccordionTrigger>
													<AccordionContent>
														<SyntaxHighlighter
															language='json'
															wrapLongLines={true}
															showLineNumbers={true}
															style={atomOneDarkReasonable}
															customStyle={{
																fontSize: '14px',
																backgroundColor: 'rgba(0, 0, 0, 0.5)',
																borderRadius: '10px',
																padding: '10px',
															}}
														>
															{JSON.stringify(quote, null, 2)}
														</SyntaxHighlighter>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardFooter>
		</Card>
	)
}
