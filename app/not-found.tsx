import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-[60px] min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
      <p className="font-serif font-light italic text-8xl text-gallery-lightgray mb-6">404</p>
      <h1 className="heading-md mb-4">Page Not Found</h1>
      <p className="body-text mb-10 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="flex gap-6 flex-wrap justify-center">
        <Link href="/" className="btn-primary">Return Home</Link>
        <Link href="/exhibitions" className="btn-ghost">View Exhibitions</Link>
      </div>
    </div>
  )
}
