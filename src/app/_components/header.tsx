'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Quote } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
	const pathname = usePathname()

	const linkStyles = (href: string) => {
		const equal = href === pathname
		return equal ? 'underline font-bold text-xl' : 'text-base'
	}
	return (
		<div className='z-10 w-full bg-black/15 backdrop-blur-xl drop-shadow-md border-transparent text-black'>
			<div className='flex flex-col'>
				<div className='mx-auto w-1/2 p-4 flex items-center gap-4 justify-center'>
					<Quote fill='text-current' size={30} className='hidden lg:block' />
					<p className='text-center text-bold text-5xl'>Quotable</p>
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
		</div>
	)
}
