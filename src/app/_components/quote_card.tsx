'use client'

import { Quote } from '@/common/types/quote_types'
import { randomQuote } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionItem } from '@radix-ui/react-accordion'
import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function QuoteCard() {
	const [quote, setQuote] = useState<Quote | undefined>(undefined)
	const [isBioShown, setIsBioShown] = useState(false)
	const [authorAccordion, setAuthorAccordion] = useState<string>('')

	const fetchQuote = async function () {
		try {
			const res = await randomQuote({})
			setAuthorAccordion('')
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
		<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full sm:w-[640px] border-transparent'>
			<CardHeader>
				<p>{quote?.content}</p>
			</CardHeader>
			<CardFooter>
				<Accordion
					type='single'
					className='w-full'
					collapsible
					value={authorAccordion}
					onValueChange={setAuthorAccordion}
				>
					<AccordionItem value='author-name'>
						<div className='flex w-full justify-between'>
							<Button
								className='bg-transparent shadow-none hover:bg-transparent [&:hover>svg]:animate-spin'
								onClick={fetchQuote}
							>
								<RefreshCw color='black' />
							</Button>
							<AccordionTrigger className='justify-end [&>svg]:hidden'>{quote.author.name}</AccordionTrigger>
						</div>
						<AccordionContent>
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
									<AccordionContent>
										<p>{quote.author.bio}</p>
										<a href={quote.author.link} className='underline'>
											{quote.author.link}
										</a>
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
