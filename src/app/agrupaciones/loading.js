export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-8 text-center" role="status">
      <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-4" />
      <p className="text-sm font-semibold text-[#94a3b8]">Cargando agrupaciones…</p>
    </div>
  );
}
