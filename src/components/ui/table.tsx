'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Column, Table as ReactTable } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import * as React from 'react'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div className='relative w-full overflow-auto'>
			<table data-slot='table' className={cn('w-full caption-bottom text-sm', className)} {...props} />
		</div>
	)
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return <thead data-slot='table-header' className={cn('[&_tr]:border-b', className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot='table-footer'
			className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
			{...props}
		/>
	)
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot='table-row'
			className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
			{...props}
		/>
	)
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot='table-head'
			className={cn(
				'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className,
			)}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot='table-cell'
			className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
			{...props}
		/>
	)
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption data-slot='table-caption' className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
	)
}

interface DataTablePaginationProps<TData> {
	table: ReactTable<TData>
	limitConfiguration?: number[]
}
function DataTablePagination<TData>({
	table,
	limitConfiguration = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
	const [pageIndex, setPageIndex] = React.useState<number>(table.getState().pagination.pageIndex ?? 0 + 1)

	const handlePageChange = (e: React.FormEvent) => {
		e.preventDefault()
		if (pageIndex >= 1 && pageIndex <= table.getPageCount()) {
			table.setPageIndex(pageIndex - 1)
		} else {
			setPageIndex(table.getState().pagination.pageIndex + 1)
		}
	}

	React.useEffect(() => {
		setPageIndex(table.getState().pagination.pageIndex + 1)
	}, [table.getState().pagination.pageIndex])

	return (
		<div className='flex items-center justify-between px-4 gap-4'>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className='h-8 max-w-fit cursor-pointer [&>svg]:stroke-black'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent
							side='top'
							className='bg-black/15 backdrop-blur-xl drop-shadow-md border-transparent text-black'
						>
							{limitConfiguration.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`} className='cursor-pointer'>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex flex-row items-center justify-items-center align-middle justify-center text-sm font-medium'>
					<div className='min-w-fit'>Page&nbsp;</div>
					<div>
						<form onSubmit={handlePageChange}>
							<Input
								type='number'
								min={1}
								max={table.getPageCount()}
								value={pageIndex}
								onChange={(e) => setPageIndex(Number(e.target.value))}
								className='field-sizing-content [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
							/>
							<VisuallyHidden>
								<Button type='submit' />
							</VisuallyHidden>
						</form>
					</div>
					<div className='min-w-fit'>&nbsp;of {table.getPageCount()}</div>
				</div>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex cursor-pointer bg-black/15 backdrop-blur-xl'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 cursor-pointer bg-black/15 backdrop-blur-xl'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 cursor-pointer bg-black/15 backdrop-blur-xl'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex cursor-pointer bg-black/15 backdrop-blur-xl'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	)
}

function TableHeaderWithSortingIcon<TModel>({
	header,
	className,
	column,
	handleColumnSorting,
}: {
	header?: string
	className?: string
	column: Column<TModel, unknown>
	handleColumnSorting: (column: Column<TModel, unknown>) => void
}) {
	return (
		<Button variant='ghost' onClick={() => handleColumnSorting(column)} className={className}>
			{header ?? column.id}
			{column.getIsSorted() === false && <ArrowUpDown className='ml-1 h-4 w-4' />}
			{column.getIsSorted() === 'desc' && <ArrowDown className='ml-1 h-4 w-4' />}
			{column.getIsSorted() === 'asc' && <ArrowUp className='ml-1 h-4 w-4' />}
		</Button>
	)
}

export {
	DataTablePagination,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableHeaderWithSortingIcon,
	TableRow,
}
