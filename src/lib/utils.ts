import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export const siteMetadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: `'${process.env.NEXT_PUBLIC_SITE_NAME} is an e-commerce site which will be capable of providing many kind of goods and products to every consumer.'`,
  siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  socialBanner: '/social-banner.png'
}
