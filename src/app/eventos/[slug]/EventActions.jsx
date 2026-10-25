'use client';

import { useState } from 'react';

export default function EventActions({ event }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(event.saved ?? false);
  const [copied, setCopied] = useState(false);

  const handleRegister = () => {
    if (event.externalLink) {
      window.open(event.externalLink, '_blank');
    } else {
      setIsRegistered(!isRegistered);
    }
  };

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareText = encodeURIComponent(`¡Mira este evento en Waddle PUCP: ${event.title}!`);
  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';

  return (
    <div className="pt-4 border-t border-white/10 space-y-4">
      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleRegister}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
          isRegistered
            ? 'bg-emerald-600 text-white shadow-emerald-600/30'
            : 'bg-[#1d6ef5] hover:bg-[#2563eb] text-white shadow-blue-600/30 hover:scale-[1.01]'
        }`}
      >
        <span>
          {isRegistered
            ? '✓ Ya estás inscrito'
            : event.externalLink
            ? 'Inscribirme en formulario externo ↗'
            : 'Inscribirme al evento →'}
        </span>
      </button>

      {/* Secondary Button */}
      <button
        type="button"
        onClick={() => setIsSaved(!isSaved)}
        className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 border ${
          isSaved
            ? 'bg-blue-600/20 border-cyan-400 text-cyan-300'
            : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
        }`}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill={isSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span>{isSaved ? 'Guardado en tu lista' : 'Guardar en biblioteca'}</span>
      </button>

      {/* Share Section */}
      <div className="pt-3 border-t border-white/5">
        <span className="text-[11px] text-[#94a3b8] uppercase font-semibold block mb-2 text-center">
          Compartir este evento
        </span>
        <div className="flex items-center justify-center gap-3">
          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? '¡Copiado!' : 'Copiar enlace'}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative"
          >
            {copied ? (
              <span className="text-xs text-cyan-400 font-bold">✓</span>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en WhatsApp"
            className="w-9 h-9 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] transition-colors"
          >
            <span className="text-xs font-bold">WA</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en LinkedIn"
            className="w-9 h-9 rounded-lg bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/30 flex items-center justify-center text-[#0077B5] transition-colors"
          >
            <span className="text-xs font-bold">in</span>
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en X"
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <span className="text-xs font-bold">𝕏</span>
          </a>
        </div>
      </div>
    </div>
  );
}
