export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <header className="bg-charcoal px-6 py-4">
        <p className="text-sm font-medium tracking-wide text-white">
          Premium<span className="text-gold">IB</span>
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-gold sm:text-5xl">
          PremiumIB
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-charcoal">
          Brand foundation is in place. Gold for headlines and actions, charcoal
          for structure, white for the canvas.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center bg-gold px-5 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark"
          >
            Get started
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-gold-dark underline-offset-4 hover:underline"
          >
            Learn more
          </a>
        </div>
      </main>

      <footer className="bg-charcoal px-6 py-6">
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()} PremiumIB
        </p>
      </footer>
    </div>
  );
}
