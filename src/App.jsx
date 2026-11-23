export default function App() {
  const apiConfigurada = Boolean(import.meta.env.VITE_API_URL);

  return (
    <main className="min-h-screen bg-chalk flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface rounded-2xl border border-gold/30 shadow-sm p-8 text-center space-y-3">
        <h1 className="font-display text-2xl font-bold text-cocoa tracking-wide">
          Bianca Bonfim Confeitaria
        </h1>
        <p className="text-sm text-cocoa-muted">
          Confeitaria artesanal com sabor de verdade.
        </p>
        <div className="pt-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              apiConfigurada
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {apiConfigurada
              ? '✓ Setup OK • API conectada no .env'
              : '⚠ Setup OK • Falta configurar VITE_API_URL no .env'}
          </span>
        </div>
      </div>
    </main>
  );
}