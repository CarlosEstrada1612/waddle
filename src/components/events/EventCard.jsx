'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Status badge colors matching the design system
const STATUS_STYLES = {
  'PRÓXIMO':   { bg: '#1d6ef5', label: 'PRÓXIMO' },
  'EN CURSO':  { bg: '#16a34a', label: 'EN CURSO', pulse: true },
  'FINALIZADO':{ bg: '#475569', label: 'FINALIZADO' },
  'CANCELADO': { bg: '#dc2626', label: 'CANCELADO' },
};

export default function EventCard({ event, eager = false }) {
  const [saved, setSaved] = useState(event.saved ?? false);

  const status = STATUS_STYLES[event.status] ?? STATUS_STYLES['PRÓXIMO'];

  // Format date: "2026-03-26" + time → "Jue, 26 Mar · 18:30"
  const formatDate = (dateStr, timeStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const base = `${day}, ${d.getDate()} ${month}`;
    // Extract start time from "18:00 - 21:00" → "18:00"
    const startTime = timeStr ? timeStr.split(' ')[0] : '';
    return startTime ? `${base} · ${startTime}` : base;
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((s) => !s);
  };

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/30"
      style={{
        background: 'linear-gradient(160deg, #0d2044 0%, #091830 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          loading={eager ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Bottom gradient so text below reads cleanly */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(9,24,48,0.55) 100%)' }}
        />

        {/* Status badge — top left */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md z-10"
          style={{ background: status.bg }}
        >
          {status.pulse && (
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-white" />
            </span>
          )}
          <span className="text-[11px] font-bold text-white tracking-wide">{status.label}</span>
        </div>

        {/* Bookmark — top right */}
        <button
          type="button"
          onClick={handleBookmark}
          aria-label={saved ? 'Quitar de guardados' : 'Guardar evento'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: saved ? '#1d6ef5' : 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#fff' }}
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Organizer name */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#38bdf8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span
            className="text-xs font-medium truncate"
            style={{ color: '#94a3b8' }}
          >
            {event.organizer}
          </span>
        </div>

        {/* Event title */}
        <h3
          className="text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors"
          style={{ color: '#f0f6ff' }}
        >
          {event.title}
        </h3>

        {/* Short description */}
        {event.description && (
          <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#94a3b8' }}>
            {event.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Date */}
        <div className="flex items-center gap-2" style={{ color: '#94a3b8' }}>
          <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#38bdf8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs font-medium">{formatDate(event.date, event.time)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2" style={{ color: '#94a3b8' }}>
          <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#38bdf8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs font-medium truncate">{event.location}</span>
        </div>

        {/* Tags row */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
                style={{
                  background: 'rgba(29,110,245,0.18)',
                  color: '#93c5fd',
                  border: '1px solid rgba(56,189,248,0.20)',
                }}
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
            {/* Modality pill */}
            <span
              className="ml-auto px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: '#cbd5e1',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {event.modality}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
