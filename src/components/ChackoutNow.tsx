'use client'
import { Button } from '@/components/ui/button'
import { useShoppingCart } from 'use-shopping-cart'

export default function CheckoutNow({ priceId }: { priceId: string }) {
    const { checkoutSingleItem } = useShoppingCart()

    function buyNow(priceId: string) {
        checkoutSingleItem(priceId)
    }

    return (
        <Button
            variant='outline'
            onClick={() => buyNow(priceId)}
        >
            Checkout Now
        </Button>
    )
}
