export default function StatusBadge({ status, className = '' }) {
  const norm = (status || '').toUpperCase();

  let bgClass = 'bg-[#1d6ef5] text-white';
  let hasPulse = false;

  if (norm === 'EN CURSO') {
    bgClass = 'bg-[#16a34a] text-white';
    hasPulse = true;
  } else if (norm === 'FINALIZADO') {
    bgClass = 'bg-[#475569] text-white';
  } else if (norm === 'CANCELADO') {
    bgClass = 'bg-[#dc2626] text-white';
  } else if (norm === 'PRÓXIMO' || norm === 'PROXIMO') {
    bgClass = 'bg-[#1d6ef5] text-white';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm ${bgClass} ${className}`}
    >
      {hasPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {status}
    </span>
  );
}
