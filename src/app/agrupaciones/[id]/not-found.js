import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center text-3xl mb-4">
        🔍
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Agrupación no encontrada</h1>
      <p className="text-sm text-[#94a3b8] max-w-md mb-6">
        El identificador no corresponde a ninguna agrupación disponible o activa en el campus.
      </p>
      <Link
        href="/agrupaciones"
        className="px-6 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all"
      >
        Explorar agrupaciones
      </Link>
    </div>
  );
}
