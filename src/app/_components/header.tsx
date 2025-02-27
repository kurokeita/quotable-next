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

	const linkColor = (href: string) => {
		const equal = href === pathname
		return equal ? 'text-white' : 'text-black'
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
									<NavigationMenuLink className={`hover:bg-transparent focus:bg-transparent ${linkColor('/')}`}>
										Home
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href='/authors' legacyBehavior passHref prefetch={true}>
									<NavigationMenuLink className={`hover:bg-transparent focus:bg-transparent ${linkColor('/authors')}`}>
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
