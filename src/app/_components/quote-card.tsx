'use client'

import { Quote } from '@/common/types/quotable'
import { randomQuote } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Accordion, AccordionItem } from '@radix-ui/react-accordion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Filter, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RawDataDialog from './raw-data-dialog'

const quoteFilterSchema = z.object({
	author: z.string().optional(),
	query: z.string().optional(),
})

export default function QuoteCard() {
	const [quote, setQuote] = useState<Quote | undefined>(undefined)
	const [isBioShown, setIsBioShown] = useState<boolean>(false)
	const [authorAccordion, setAuthorAccordion] = useState<string>('')
	const [isFilterShown, setIsFilterShown] = useState<boolean>(false)
	const form = useForm<z.infer<typeof quoteFilterSchema>>({
		resolver: zodResolver(quoteFilterSchema),
		defaultValues: {
			author: '',
			query: '',
		},
	})

	const fetchQuote = useCallback(
		async function () {
			setQuote(undefined)

			const { author, query } = form.watch()
			setAuthorAccordion('')

			try {
				const res = await randomQuote({ author, query })
				setQuote(res)
			} catch {
				errorToast('Failed to fetch quote')
				setQuote(undefined)
			}
		},
		[form],
	)

	const toggleBio = () => {
		setIsBioShown(!isBioShown)
	}

	const handleFilter = (e: React.FormEvent) => {
		e.preventDefault()
		form.handleSubmit(fetchQuote)()
	}

	const toggleFilter = useCallback(() => {
		if (isFilterShown) {
			form.reset()
		}

		setIsFilterShown(!isFilterShown)
	}, [isFilterShown, form])

	useEffect(() => {
		fetchQuote()
	}, [fetchQuote])

	return (
		<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full grow sm:grow-0 border-transparent text-current max-w-screen rounded-none sm:rounded-md flex justify-center'>
			<CardContent className='flex flex-col justify-center gap-4'>
				<Accordion type='single' className='w-full pb-0' value={isFilterShown ? 'filter' : ''}>
					<AccordionItem value='filter'>
						<VisuallyHidden>
							<AccordionTrigger></AccordionTrigger>
						</VisuallyHidden>
						<AccordionContent>
							<Form {...form}>
								<form className='flex flex-col md:flex-row gap-2 justify-between' onSubmit={handleFilter}>
									<FormField
										control={form.control}
										name='author'
										render={({ field }) => (
											<FormItem className='w-full px-2'>
												<FormLabel>Author</FormLabel>
												<FormControl>
													<Input
														placeholder='Search by author name'
														{...field}
														className='focus:border-transparent focus:outline-transparent focus:border-0 focus:outline-0'
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='query'
										render={({ field }) => (
											<FormItem className='w-full px-2'>
												<FormLabel>Content</FormLabel>
												<FormControl>
													<Input
														placeholder='Type something to search'
														{...field}
														className='focus:border-transparent focus:outline-transparent focus:border-0 focus:outline-0'
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<VisuallyHidden>
										<Button type='submit'>Filter</Button>
									</VisuallyHidden>
								</form>
							</Form>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				{!quote && <Skeleton className='w-full h-[20px] rounded-full' />}
				{quote && (
					<div className='w-full'>
						<p className='text-center text-2xl font-bold italic font-mono'>{quote?.content}</p>
					</div>
				)}
			</CardContent>
			<CardFooter className='pb-0'>
				{!quote && (
					<div className='flex flex-col gap-4 w-full'>
						<Skeleton className='w-full h-[20px] rounded-full' />
						<Actions fetchHandler={handleFilter} filterHandler={toggleFilter} />
					</div>
				)}
				{quote && (
					<Accordion
						type='single'
						className='w-full pb-0'
						collapsible
						value={authorAccordion}
						onValueChange={setAuthorAccordion}
					>
						<AccordionItem value='author-name'>
							<div className='flex w-full justify-between'>
								<Actions fetchHandler={handleFilter} filterHandler={toggleFilter} />
								<AccordionTrigger className='justify-end [&>svg]:hidden'>{quote.author.name}</AccordionTrigger>
							</div>
							<AccordionContent className='pb-0'>
								<Accordion type='single' collapsible>
									<AccordionItem value='author-bio'>
										<div className='flex flex-col sm:flex-row w-full justify-between'>
											<div className='flex items-center'>
												<p>{quote.author.description}</p>
											</div>
											<AccordionTrigger onClick={toggleBio} className='[&>svg]:text-current'>
												{isBioShown ? 'Less' : 'More'}
											</AccordionTrigger>
										</div>
										<AccordionContent className='flex flex-col gap-4 pb-0'>
											<div className='w-full'>
												<p>{quote.author.bio}</p>
											</div>
											<div className='flex flex-col sm:flex-row w-full py-2 sm:relative'>
												<div className='w-full'>
													<a href={quote.author.link} className='underline'>
														{quote.author.link}
													</a>
												</div>
												<div className='flex items-center justify-center sm:justify-start sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2'>
													<RawDataDialog data={quote} tooltip='Raw quote data' />
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				)}
			</CardFooter>
		</Card>
	)
}

function Actions({
	fetchHandler,
	filterHandler,
}: {
	fetchHandler: (e: React.FormEvent) => void
	filterHandler: () => void
}) {
	return (
		<div className='flex gap-4'>
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger className='bg-transparent shadow-none hover:bg-transparent ' onClick={fetchHandler}>
						<RefreshCw size={20} className='hover:animate-spin' />
					</TooltipTrigger>
					<TooltipContent>
						<p>Fetch new quote</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger className='bg-transparent shadow-none hover:bg-transparent' onClick={filterHandler}>
						<Filter size={20} />
					</TooltipTrigger>
					<TooltipContent>
						<p>Filter</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
