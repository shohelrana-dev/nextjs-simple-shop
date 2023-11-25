'use client'
import { PropsWithChildren } from 'react'
import { CartProvider } from 'use-shopping-cart'

export default function Providers({ children }: PropsWithChildren) {
    return (
        <CartProvider
            mode='payment'
            cartMode='client-only'
            stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
            successUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/stripe/success`}
            cancelUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/stripe/error`}
            currency='USD'
            billingAddressCollection={false}
            shouldPersist={true}
            language='en-US'
        >
            {children}
        </CartProvider>
    )
}
