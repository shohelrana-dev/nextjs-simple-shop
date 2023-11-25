export interface SimplifiedProduct {
    _id: string
    name: string
    imageUrl: string
    price: number
    slug: string
    categoryName: string
}

export interface SingleProduct {
    _id: string
    name: string
    description: string
    images: any
    price: number
    price_id: string
    slug: string
    categoryName: string
}