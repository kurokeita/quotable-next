'use client'

import { Author } from '@/common/types/quotable'
import { FetchAuthorsResponse } from '@/common/types/response'
import { fetchAuthors } from '@/common/utils/api'
import { errorToast } from '@/common/utils/notify'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
	DataTablePagination,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableHeaderWithSortingIcon,
	TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
	Column,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	Updater,
	useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)

type ColumnMetadata = {
	className?: string
}

export default function AuthorsTable() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [authorsData, setAuthorsData] = useState<FetchAuthorsResponse | undefined>(undefined)
	const [pageSize, setPageSize] = useState<10 | 25 | 50 | 100>(10)
	const [page, setPage] = useState<number>(0)
	const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])

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

	const handleColumnSorting = useCallback((column: Column<Author, unknown>) => {
		const currentSort = column.getIsSorted()

		if (!currentSort || currentSort === 'desc') {
			setSorting([{ id: column.id, desc: false }])
		} else {
			setSorting([{ id: column.id, desc: true }])
		}

		setPage(0)
	}, [])

	const columns = useMemo<ColumnDef<Author>[]>(
		() => [
			{
				accessorKey: 'name',
				meta: {
					className: 'w-32 sm:flex-2 cursor',
				},
				header: ({ column }) => (
					<TableHeaderWithSortingIcon
						header='Name'
						column={column}
						handleColumnSorting={handleColumnSorting}
						className='hover:bg-transparent cursor-pointer hover:text-current'
					/>
				),
				cell: ({ row }) => (
					<Link href={`/authors/${row.original.slug}`} className='no-underline'>
						{row.original.name}
					</Link>
				),
			},
			{
				accessorKey: 'description',
				header: 'Description',
				meta: {
					className: 'w-48 sm:flex-2 text-justify',
				},
			},
			{
				accessorKey: 'bio',
				header: 'Bio',
				meta: {
					className: 'w-96 sm:flex-4 text-justify',
				},
			},
			{
				accessorKey: 'link',
				header: 'Link',
				meta: {
					className: 'w-48 sm:flex-2 truncate',
				},
				cell: ({ row }) => (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='w-48 sm:flex-2 truncate'>
									<Link href={row.original.link} target='_blank' className='underline'>
										{row.original.link}
									</Link>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{row.original.link}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				),
			},
			{
				accessorKey: 'quotesCount',
				header: ({ column }) => (
					<TableHeaderWithSortingIcon
						header='Quotes'
						column={column}
						handleColumnSorting={handleColumnSorting}
						className='hover:bg-transparent cursor-pointer hover:text-current'
					/>
				),
				meta: {
					className: 'w-28 sm:flex-1',
				},
				cell: ({ row }) => <div className='text-center sm:flex-2'>{row.original.quotesCount}</div>,
			},
		],
		[handleColumnSorting],
	)

	const tableData = useMemo(
		() => (isLoading ? Array(pageSize).fill({}) : (authorsData?.data ?? [])),
		[isLoading, authorsData, pageSize],
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
		pageCount: (authorsData?.metadata.lastPage ?? 0) + 1,
		state: {
			pagination: {
				pageIndex: page,
				pageSize,
			},
			sorting,
		},
		onPaginationChange: handlePagination,
		manualPagination: true,
		getSortedRowModel: getSortedRowModel(),
		manualSorting: true,
		enableMultiSort: false,
		enableSorting: true,
	})

	const fetchData = useCallback(async function ({
		page,
		pageSize,
		sorting,
	}: {
		page: number
		pageSize: 10 | 25 | 50 | 100
		sorting: SortingState
	}) {
		setIsLoading(true)

		let order: 'asc' | 'desc' | undefined, sortBy: 'name' | 'dateAdded' | 'dateModified' | 'quotesCount' | undefined

		if (sorting.length > 0) {
			const { id, desc } = sorting[0]
			order = desc ? 'desc' : 'asc'
			sortBy = id as 'name' | 'dateAdded' | 'dateModified' | 'quotesCount'
		}

		try {
			const res = await fetchAuthors({ page, limit: pageSize, order, sortBy })
			setAuthorsData(res)
		} catch {
			errorToast('Failed to fetch authors')
		}

		setIsLoading(false)
	}, [])

	useEffect(() => {
		fetchData({ page, pageSize, sorting })
	}, [page, pageSize, sorting, fetchData])

	return (
		<div>
			<div className='rounded:none sm:rounded-md overflow-auto'>
				<Table className='flex flex-col min-w-fit'>
					<TableHeader className='w-full'>
						{table.getHeaderGroups().map((g) => (
							<TableRow key={g.id} className='flex w-full hover:bg-transparent'>
								{g.headers.map((h) => (
									<TableHead
										key={h.id}
										className={cn(
											'text-current font-bold flex items-center',
											(h.column.columnDef.meta as ColumnMetadata)?.className,
										)}
									>
										{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='w-full'>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} className='flex w-full'>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={cn((cell.column.columnDef.meta as ColumnMetadata)?.className)}>
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
			<div className='flex justify-end px-4 pt-4 pb-0'>
				<Dialog>
					<DialogTrigger className='cursor-pointer'>Raw data</DialogTrigger>
					<DialogContent
						className='bg-black/15 backdrop-blur-xl drop-shadow-md overflow-auto max-h-screen min-w-screen lg:max-h-3/4 lg:min-w-3/4 p-0 border-0'
						overlayClassName='bg-black/25 backdrop-blur-xl'
						closeButtonClassName='block lg:hidden text-white'
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
							{JSON.stringify(authorsData, null, 2)}
						</SyntaxHighlighter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
