'use client'

import RawDataDialog from '@/app/_components/raw-data-dialog'
import { Author, Quote } from '@/common/types/quotable'
import { FetchQuotesResponse } from '@/common/types/response'
import { fetchQuotes } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTablePagination, Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
	ColumnDef,
	PaginationState,
	Updater,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
		async ({
			page,
			pageSize,
		}: {
			page: number
			pageSize: 10 | 25 | 50 | 100
		}) => {
			setIsLoading(true)

			try {
				const res = await fetchQuotes({
					limit: pageSize,
					page,
					author: author.name,
				})
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
		<Card className='blur-background w-full grow sm:grow-0 max-w-screen rounded-none sm:rounded-md flex justify-start sm:justify-center pb-0'>
			<CardHeader>
				<CardTitle className='flex w-full p-4 relative'>
					<div className='flex mx-auto w-1/2 items-center gap-4 justify-center'>
						<p className='text-center text-2xl'>{author.name}</p>
					</div>
					<div className='flex items-center absolute right-0 top-1/2 -translate-y-1/2'>
						<RawDataDialog data={author} tooltip='Raw author data' />
					</div>
				</CardTitle>
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
													<TableCell key={cell.id} className='text-justify text-lg font-bold italic font-mono'>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
							<div className='flex items-center justify-between gap-4 pt-4'>
								<RawDataDialog data={quotesData} tooltip='Raw quotes data' />
								<DataTablePagination table={table} limitConfiguration={[10, 25, 50, 100]} />
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	)
}
