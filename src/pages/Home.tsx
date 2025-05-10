import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Need a believable excuse?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Generate creative and believable excuses instantly with AI
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-2">
              Get started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}