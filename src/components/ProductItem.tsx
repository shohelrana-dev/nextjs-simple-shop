import { SimplifiedProduct } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductItem({ product }: { product: SimplifiedProduct }) {
  const { imageUrl, name, slug, categoryName, price } = product

  return (
    <article className='group relative'>
      <div className='aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
        <Link href={`/products/${slug}`}>
          {imageUrl ? <Image
            src={imageUrl}
            alt={name}
            className='w-full h-full object-cover object-center lg:h-full lg:w-full'
            width={300}
            height={300}
          /> : null}
        </Link>
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-gray-700'>
            <Link href={`/products/${slug}`}>
              {name}
            </Link>
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            {categoryName}
          </p>
        </div>
        <p className='text-sm font-medium text-gray-900'>
          ${price}
        </p>
      </div>
    </article>
  )
}