import AddToBag from '@/components/AddToBag'
import CheckoutNow from '@/components/ChackoutNow'
import ImageGallery from '@/components/ImageGallery'
import { Button } from '@/components/ui/button'
import { client, urlFor } from '@/lib/sanity'
import { SingleProduct } from '@/types'
import { StarIcon, TruckIcon } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = await getProduct(params.slug)

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [urlFor(product.images[0]).url()]
        },
        twitter: {
            title: product.name,
            description: product.description,
            images: [urlFor(product.images[0]).url()]
        }
    }
}

async function getProduct(slug: string): Promise<SingleProduct> {
    const query = `*[_type == 'product' && slug.current == '${slug}'][0]{
        _id,
        name,
        description,
        images,
        price,
        price_id,
        'slug': slug.current,
        'categoryName': category->name 
      }`

    return await client.fetch(query) as SingleProduct
}

export default async function SingleProductPage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug)

    if (!product) return notFound()

    const { images, categoryName, name, price, description, price_id } = product

    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
                <div className='grid gap-8 md:grid-cols-2'>
                    <ImageGallery images={images} />

                    <div className='md:py-8'>
                        <div className='mb-2 md:mb-3'>
                            <span className='mb-0.5 inline-block text-gray-500'>
                                {categoryName}
                            </span>
                            <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
                                {name}
                            </h2>
                        </div>

                        <div className='mb-6 flex items-center gap-3 md:mb-10'>
                            <Button className='rounded-full gap-x-2'>
                                <span className='text-sm'>4.3</span>
                                <StarIcon className='h-5 w-5' />
                            </Button>

                            <span className='text-sm text-gray-500 transition duration-100'>
                                56 Ratings
                            </span>
                        </div>

                        <div className='mb-4'>
                            <div className='flex items-end gap-2'>
                                <span className='text-xl font-bold text-gray-800 md:text-2xl'>
                                    {price}
                                </span>
                                <span className='mb-0.5 text-red-500 line-through'>
                                    {price + 30}
                                </span>
                            </div>

                            <span className='text-sm text-gray-500'>
                                Inc. Vat plus shipping
                            </span>
                        </div>

                        <div className='mb-6 flex items-center gap-2 text-gray-500'>
                            <TruckIcon className='w-6 h-6' />
                            <span className='text-sm'>
                                2-4 Day Shipping
                            </span>
                        </div>

                        <div className='flex gap-2.5'>
                            <AddToBag product={product} />
                            <CheckoutNow priceId={price_id} />
                        </div>

                        <p className='mt-12 text-base text-gray-500 tracking-wide'>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
