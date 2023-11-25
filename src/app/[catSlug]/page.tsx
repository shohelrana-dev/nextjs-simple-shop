import ProductItem from '@/components/ProductItem'
import { client } from '@/lib/sanity'
import { capitalizeFirstLetter } from '@/lib/utils'
import { SimplifiedProduct } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export function generateMetadata({ params }: { params: { catSlug: string } }): Metadata {
    return {
        title: `Our products for ${capitalizeFirstLetter(params.catSlug.replace('-', ' '))}`
    }
}
async function getProducts(catSlug: string): Promise<SimplifiedProduct[]> {
    const query = `*[_type == 'product' && category->slug.current == '${catSlug}']{
        _id,
        name,
        price,
        'slug': slug.current,
        'categoryName': category->name,
        'imageUrl': images[0].asset->url 
      }`

    return await client.fetch(query) as SimplifiedProduct[]
}

export default async function CategoryPage({ params }: { params: { catSlug: string } }) {
    const data = await getProducts(params.catSlug)

    if (!data) notFound()

    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                        Our products for {data[0].categoryName}
                    </h2>
                </div>
                <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                    {data.map((product) => <ProductItem key={product._id} product={product} />)}
                </div>
            </div>
        </div>
    )
}
