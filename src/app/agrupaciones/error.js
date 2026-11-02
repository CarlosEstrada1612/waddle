'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-2xl mb-4">
        ⚠️
      </div>
      <h1 className="text-xl font-bold text-white mb-2">No pudimos cargar las agrupaciones</h1>
      <p className="text-sm text-[#94a3b8] max-w-md mb-6">
        Ocurrió un error temporal al consultar los datos. Inténtalo nuevamente en unos momentos.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          Volver a intentar
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-semibold transition-all border border-white/10"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
