export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} Alibi AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}