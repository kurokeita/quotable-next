'use client'

import { Quote } from '@/common/types/quote_types'
import { randomQuote } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Accordion, AccordionItem } from '@radix-ui/react-accordion'
import { Filter, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { z } from 'zod'

SyntaxHighlighter.registerLanguage('json', json)

const quoteFilterSchema = z.object({
	author: z.string().optional(),
	query: z.string().optional(),
})

export default function QuoteCard() {
	const [quote, setQuote] = useState<Quote | undefined>(undefined)
	const [isBioShown, setIsBioShown] = useState(false)
	const [authorAccordion, setAuthorAccordion] = useState<string>('')
	const form = useForm<z.infer<typeof quoteFilterSchema>>({
		resolver: zodResolver(quoteFilterSchema),
		defaultValues: {
			author: '',
			query: '',
		},
	})

	const fetchQuote = async function () {
		const { author, query } = form.getValues() as z.infer<typeof quoteFilterSchema>
		setAuthorAccordion('')

		try {
			const res = await randomQuote({ author, query })
			setQuote(res)
		} catch {
			errorToast('Failed to fetch quote')
			setQuote(undefined)
		}
	}

	const toggleBio = () => {
		setIsBioShown(!isBioShown)
	}

	const handleFilter = () => {
		form.handleSubmit(fetchQuote)()
	}

	useEffect(() => {
		fetchQuote()
	}, [])

	if (!quote) {
		return (
			<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full sm:w-[640px] border-transparent text-black'>
				<CardHeader className='justify-center flex flex-col gap-4'>
					{(form.watch('query') || form.watch('author')) && (
						<div className='w-full'>
							<p className='text-center'>Filtering by:</p>
							{form.watch('author') && <p className='text-center'>Author: {form.watch('author')}</p>}
							{form.watch('query') && <p className='text-center'>Query: {form.watch('query')}</p>}
						</div>
					)}
				</CardHeader>
				<CardContent className='p-4 md:p-7 backdrop-blur-xs'>
					<Skeleton className='w-full h-[20px] rounded-full' />
				</CardContent>
				<CardFooter className='backdrop-blur-xs'>
					<div className='flex flex-col gap-4 w-full'>
						<Skeleton className='w-full h-[20px] rounded-full' />
						<Actions handler={handleFilter} form={form} />
					</div>
				</CardFooter>
			</Card>
		)
	}

	return (
		<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full border-transparent text-black'>
			<CardHeader className='justify-center flex flex-col gap-4'>
				{(form.watch('query') || form.watch('author')) && (
					<div className='w-full'>
						<p className='text-center'>Filtering by:</p>
						{form.watch('author') && <p className='text-center'>Author: {form.watch('author')}</p>}
						{form.watch('query') && <p className='text-center'>Query: {form.watch('query')}</p>}
					</div>
				)}
				<div className='w-full'>
					<p className='text-center text-2xl font-bold italic font-mono'>{quote?.content}</p>
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
							<Actions handler={handleFilter} form={form} />
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

function Actions({ form, handler }: { form: UseFormReturn; handler: () => void }) {
	return (
		<div className='flex gap-4'>
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger
						className='bg-transparent shadow-none hover:bg-transparent [&:hover>svg]:animate-spin'
						onClick={handler}
					>
						<RefreshCw size={20} />
					</TooltipTrigger>
					<TooltipContent>
						<p>Fetch new quote</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider delayDuration={300}>
				<Popover>
					<Tooltip>
						<PopoverTrigger asChild>
							<TooltipTrigger className='bg-transparent shadow-none hover:bg-transparent'>
								<Filter size={20} />
							</TooltipTrigger>
						</PopoverTrigger>
						<TooltipContent>
							<p>Filter</p>
						</TooltipContent>
					</Tooltip>
					<PopoverContent className='bg-black/25 backdrop-blur-xl border-transparent text-black' side='top'>
						<Form {...form}>
							<form className='flex flex-col gap-4' onSubmit={handler}>
								<FormField
									control={form.control}
									name='author'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Author</FormLabel>
											<FormControl>
												<Input placeholder='Author' {...field} className='focus:border-transparent' />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='query'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Content</FormLabel>
											<FormControl>
												<Input placeholder='Type something to search' {...field} className='focus:border-transparent' />
											</FormControl>
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</PopoverContent>
				</Popover>
			</TooltipProvider>
		</div>
	)
}
