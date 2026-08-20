export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-lg font-bold text-primary">
            Marketplace
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted">
            Find the products you need from trusted sellers.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

