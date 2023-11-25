

export default function Footer() {
    return (
        <footer className='text-center text-gray-400 bg-gray-800 text-sm px-6 py-4 md:py-6'>
           &copy; 2023 {process.env.NEXT_PUBLIC_SITE_NAME}. All rights reserved.
        </footer>
    )
}
