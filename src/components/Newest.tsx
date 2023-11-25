import ProductItem from "@/components/ProductItem"
import { client } from "@/lib/sanity"
import { SimplifiedProduct } from "@/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

async function getData(): Promise<SimplifiedProduct[]> {
    const query = `*[_type == 'product'][0...4] | order(_createdAt desc){
        _id,
        name,
        price,
        'slug': slug.current,
        'categoryName': category->name,
        'imageUrl': images[0].asset->url 
      }`

    return await client.fetch(query) as SimplifiedProduct[]
}

export default async function Newest() {
    const data = await getData()

    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                        Our Newest products
                    </h2>

                    <Link href='/products' className='text-primary flex items-center gap-x-1'>
                        See all{' '}
                        <ArrowRight />
                    </Link>
                </div>
                <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                    {data.map((product) => <ProductItem key={product._id} product={product} />)}
                </div>
            </div>
        </div>
    )
}
