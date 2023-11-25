'use client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'


export default function ShoppingCartModal() {
    const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice, redirectToCheckout } = useShoppingCart()

    async function handleCheckoutClick(event: any) {
        event.preventDefault()

        try {
            const result = await redirectToCheckout()

            if (result?.error) {
                console.error('Payment failed: ', result?.error)
            }
        } catch (err) {
            console.error('Payment failed: ', err)
        }
    }

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
            <SheetContent className='sm:max-w-lg w-[90vw]'>
                <SheetHeader>
                    <SheetTitle className='border-b border-gray-200 pb-3'>
                        Shopping Cart
                    </SheetTitle>
                </SheetHeader>

                <div className='h-full flex flex-col justify-between'>
                    <div className='flex-1 overflow-y-auto'>
                        <ul className='my-6 divide-y divide-gray-200'>
                            {cartCount === 0 ? (
                                <h2 className='py-6'>
                                    Your cart is empty.
                                </h2>
                            ) : (
                                <>
                                    {Object.values(cartDetails ?? {}).map(({ id, name, image, slug, price, description, quantity }) => (
                                        <li key={id} className='flex py-6'>
                                            <div className='w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                                <Image
                                                    src={image!}
                                                    alt={name}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>

                                            <div className='ml-4 flex flex-1 flex-col'>
                                                <div className='flex justify-between text-base font-medium text-orange-900'>
                                                    <Link
                                                        href={`/products/${slug}`}
                                                        className='hover:text-blue-700'
                                                        onClick={() => handleCartClick()}
                                                    >
                                                        <h3>{name}</h3>
                                                    </Link>
                                                    <p className='ml-4'>{price}</p>
                                                </div>
                                                <p className='mt-1 text-sm text-gray-500 line-clamp-2'>
                                                    {description}
                                                </p>

                                                <div className='flex flex-1 items-end justify-between text-sm'>
                                                    <p className='text-gray-500'>QTY: {quantity}</p>

                                                    <div className='flex'>
                                                        <button
                                                            type='button'
                                                            className='font-medium text-primary hover:text-primary/80'
                                                            onClick={() => { removeItem(id) }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                            <p>Subtotal:</p>
                            <p>{totalPrice}</p>
                        </div>
                        <p className='text-sm mt-0.5 text-gray-500'>
                            Shipping and taxes calculated at checkout.
                        </p>

                        <div className='mt-6'>
                            <Button className='w-full' onClick={handleCheckoutClick}>
                                Checkout
                            </Button>
                        </div>

                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                            <p>
                                OR{' '}
                                <button
                                    className='font-medium text-primary hover:text-primary/80'
                                    onClick={() => handleCartClick()}
                                >
                                    Continue Shopping
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
