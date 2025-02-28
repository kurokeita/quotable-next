'use client'

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Sling } from 'hamburger-react'
import { Quote } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import GitHubIcon from '../../../public/icons/github.svg'

export default function Header() {
	const pathname = usePathname()
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

	const linkStyles = (href: string) => {
		const equal = href === pathname
		return equal ? 'underline font-bold text-xl' : 'text-base'
	}
	return (
		<div className='z-10 w-full bg-black/15 backdrop-blur-xl drop-shadow-md border-transparent text-current'>
			{/* Header for screen with width >= 640px (40rem) */}
			<div className='hidden sm:flex sm:flex-col'>
				<div className='flex w-full p-4 relative'>
					<div className='flex mx-auto w-1/2 items-center gap-4 justify-center'>
						<Quote fill='text-current' size={30} className='hidden lg:block' />
						<p className='text-center text-bold text-5xl'>Quotable</p>
					</div>
					<div className='flex items-center absolute right-4 top-1/2 -translate-y-1/2'>
						<Link href='https://github.com/kurokeita/quotable-next' className='no-underline' target='_blank'>
							<GitHubIcon width={30} height={30} />
						</Link>
					</div>
				</div>
				<div className='flex justify-center'>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href='/' legacyBehavior passHref prefetch={true}>
									<NavigationMenuLink
										className={`hover:bg-transparent focus:bg-transparent focus:text-current ${linkStyles('/')}`}
									>
										Home
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href='/authors' legacyBehavior passHref prefetch={true}>
									<NavigationMenuLink
										className={`hover:bg-transparent focus:bg-transparent focus:text-current ${linkStyles('/authors')}`}
									>
										Authors
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
			{/* Header targeting mobile screen with width < 640px (40rem) */}
			<div className='flex flex-col sm:hidden'>
				<div className='w-full px-4 flex justify-between'>
					<div className='min-w-fit p-4 flex items-center gap-4'>
						<Drawer onOpenChange={setIsDrawerOpen} open={isDrawerOpen}>
							<DrawerTrigger>
								<Sling size={30} toggled={isDrawerOpen} />
							</DrawerTrigger>
							<DrawerContent className='bg-black backdrop-blur-xl drop-shadow-md border-transparent text-white flex flex-col'>
								<VisuallyHidden>
									<DrawerHeader>
										<DrawerTitle></DrawerTitle>
										<DrawerDescription></DrawerDescription>
									</DrawerHeader>
								</VisuallyHidden>
								<NavigationMenu className='flex flex-col gap-4 min-w-full'>
									<NavigationMenuList className='flex flex-col gap-4 w-full'>
										<NavigationMenuItem onClick={() => setIsDrawerOpen(false)}>
											<Link href='/' legacyBehavior passHref prefetch={true}>
												<NavigationMenuLink
													className={`hover:bg-transparent focus:bg-transparent focus:text-current text-center ${linkStyles('/')}`}
												>
													Home
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
										<NavigationMenuItem onClick={() => setIsDrawerOpen(false)}>
											<Link href='/authors' legacyBehavior passHref prefetch={true}>
												<NavigationMenuLink
													className={`hover:bg-transparent focus:bg-transparent focus:text-current ${linkStyles('/authors')}`}
												>
													Authors
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
							</DrawerContent>
						</Drawer>
						<Link href='/' className='no-underline'>
							<p className='text-bold text-3xl'>Quotable</p>
						</Link>
					</div>
					<div className='flex items-center'>
						<Link href='https://github.com/kurokeita/quotable-next' className='no-underline' target='_blank'>
							<GitHubIcon width={30} height={30} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
