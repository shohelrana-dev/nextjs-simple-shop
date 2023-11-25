'use client'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

const links = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Teens', href: '/teens' },
]

export default function Navbar() {
    const pathname = usePathname()
    const { handleCartClick } = useShoppingCart()

    return (
        <header className='mb-8 border-b'>
            <div className='flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl'>
                <Link href='/'>
                    <h1 className='text-2xl md:text-4xl font-bold'>
                        Next<span className='text-primary'>SimpleShop</span>
                    </h1>
                </Link>

                <nav className='hidden gap-12 lg:flex 2xl:ml-16'>
                    {links.map(({ name, href }, idx) => (
                        <div key={idx}>
                            {pathname === href ? (
                                <Link href={href} className='text-lg font-semibold text-primary'>
                                    {name}
                                </Link>
                            ) : (
                                <Link href={href} className='text-lg font-semibold text-gray-600 duration-100 hover:text-primary'>
                                    {name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className='flex devide-x border-r sm:broder-l'>
                    <Button
                        variant='outline'
                        className='flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none'
                        onClick={() => handleCartClick()}
                    >
                        <ShoppingBag />
                        <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                            Cart
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
