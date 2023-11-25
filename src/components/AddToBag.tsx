'use client'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import { SingleProduct } from '@/types'
import { useShoppingCart } from 'use-shopping-cart'

export interface Props {
    product: SingleProduct
}

export default function AddToBag({ product }: Props) {
    const { addItem, handleCartClick } = useShoppingCart()

    const cartProduct = {
        ...product,
        currency: 'USD',
        image: urlFor(product.images[0]).url()
    }

    return (
        <Button onClick={() => {
            addItem(cartProduct)
            handleCartClick()
        }}>
            Add To Bag
        </Button>
    )
}
