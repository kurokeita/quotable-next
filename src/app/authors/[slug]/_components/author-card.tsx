'use client'

import { Author, Quote } from '@/common/types/quotable'
import { FetchQuotesResponse } from '@/common/types/response'
import { fetchQuotes } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTablePagination, Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	PaginationState,
	Updater,
	useReactTable,
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)

export default function AuthorCard({ author }: { author: Author }) {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [quotesData, setQuotesData] = useState<FetchQuotesResponse | undefined>(undefined)
	const [page, setPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<10 | 25 | 50 | 100>(10)

	const columns = useMemo<ColumnDef<Quote>[]>(
		() => [
			{
				accessorKey: 'content',
			},
		],
		[],
	)

	const handlePagination = useCallback(
		(updater: Updater<PaginationState>) => {
			let newState

			if (typeof updater === 'function') {
				newState = updater({ pageIndex: page, pageSize })
			} else {
				newState = updater
			}

			if (newState.pageSize !== pageSize) {
				setPage(0)
			} else {
				setPage(newState.pageIndex)
			}
			setPageSize(newState.pageSize as 10 | 25 | 50 | 100)
		},
		[page, pageSize],
	)

	const tableData = useMemo(
		() => (isLoading ? Array(pageSize).fill({}) : (quotesData?.data ?? [])),
		[isLoading, quotesData, pageSize],
	)
	const tableColumns = useMemo(
		() =>
			isLoading
				? columns.map((c) => ({
						...c,
						cell: () => <Skeleton className='h-8 w-full rounded-full' />,
					}))
				: columns,
		[isLoading, columns],
	)

	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: (quotesData?.metadata.lastPage ?? 0) + 1,
		state: {
			pagination: {
				pageIndex: page,
				pageSize,
			},
		},
		onPaginationChange: handlePagination,
		manualPagination: true,
	})

	const fetchData = useCallback(
		async ({ page, pageSize }: { page: number; pageSize: 10 | 25 | 50 | 100 }) => {
			setIsLoading(true)

			try {
				const res = await fetchQuotes({ limit: pageSize, page, author: author.name })
				setQuotesData(res)
			} catch {
				errorToast('Failed to fetch quotes')
			}

			setIsLoading(false)
		},
		[author.name],
	)

	useEffect(() => {
		fetchData({ page, pageSize })
	}, [fetchData, page, pageSize])

	return (
		<Card className='bg-black/15 backdrop-blur-xl drop-shadow-md w-full grow sm:grow-0 border-transparent text-current max-w-screen rounded-none sm:rounded-md flex justify-start sm:justify-center'>
			<CardHeader>
				<CardTitle className='text-center'>{author.name}</CardTitle>
				<CardDescription className='text-center text-current'>{author.description}</CardDescription>
				<div className='text-justify'>{author.bio}</div>
			</CardHeader>
			<CardContent>
				<Accordion type='single' collapsible>
					<AccordionItem value='quotes'>
						<AccordionTrigger className='hover:no-underline [&>svg]:text-current'>
							Quotes from {author.name}
						</AccordionTrigger>
						<AccordionContent>
							<div>
								<Table className='flex flex-col min-w-fit'>
									<TableBody className='w-full'>
										{table.getRowModel().rows.map((row) => (
											<TableRow key={row.id} className='flex w-full'>
												{row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id} className='px-0'>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
							<div className='flex items-center justify-end gap-4 pt-4'>
								<DataTablePagination table={table} limitConfiguration={[10, 25, 50, 100]} />
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
			<CardFooter className='justify-end'>
				<Dialog>
					<DialogTrigger className='cursor-pointer'>Raw data</DialogTrigger>
					<DialogContent
						noCloseButton={false}
						className='bg-black/15 backdrop-blur-xl drop-shadow-md overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-h-3/4 min-w-3/4 p-0 border-0'
						overlayClassName='bg-black/25 backdrop-blur-xl'
					>
						<VisuallyHidden>
							<DialogHeader>
								<DialogTitle></DialogTitle>
								<DialogDescription></DialogDescription>
							</DialogHeader>
						</VisuallyHidden>
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
							{JSON.stringify(quotesData, null, 2)}
						</SyntaxHighlighter>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	)
}
