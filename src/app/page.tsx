import Hero from '@/components/Hero'
import Newest from '@/components/Newest'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home'
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Newest />
    </main>
  )
}
