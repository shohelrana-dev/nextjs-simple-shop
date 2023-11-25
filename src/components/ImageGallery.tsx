'use client'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { useState } from 'react'


export default function ImageGallery({ images }: { images: any }) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div className='grid gap-4 lg:grid-cols-5'>
            <div className='order-last flex gap-4 lg:order-none lg:flex-col'>
                {images.map((image: any, idx: number) => (
                    <div key={idx} className='overflow-hidden rounded-lg bg-gray-100' onClick={() => setSelectedImage(image)}>
                        <Image
                            src={urlFor(image).url()}
                            width={200}
                            height={200}
                            alt='Product photo'
                            className='h-full w-full object-cover object-center cursor-pointer'
                        />
                    </div>
                ))}
            </div>

            <div className='relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4'>
                <Image
                    src={urlFor(selectedImage).url()}
                    alt='Product photo'
                    width={500}
                    height={500}
                    className='w-full h-full object-cover object-center'
                />

                <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                    Sale
                </span>
            </div>
        </div>
    )
}
