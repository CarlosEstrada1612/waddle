'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatusBadge from '@/components/layout/StatusBadge';

export default function EventListItem({
  event,
  showImage = false,
  onUnsave = null,
}) {
  const [isSaved, setIsSaved] = useState(event.saved ?? true);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onUnsave && isSaved) {
      onUnsave(event.id);
    }
  };

  const handleAddToCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description || ''
    )}&location=${encodeURIComponent(event.location || '')}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="group glass-card hover:border-cyan-400/40 p-4 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <Link
        href={`/eventos/${event.slug}`}
        className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
      >
        {/* Optional Thumbnail for Guardados view */}
        {showImage && (
          <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden shrink-0 bg-[#0a1f3d]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="140px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute top-1.5 left-1.5">
              <StatusBadge status={event.status} className="scale-75 origin-top-left" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {!showImage && <StatusBadge status={event.status} />}
            {event.code && (
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                {event.code}
              </span>
            )}
            <span className="text-xs text-cyan-400 font-medium">
              {event.organizer}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
            {event.title}
          </h3>

          {event.description && (
            <p className="text-xs text-[#94a3b8] line-clamp-1 mt-0.5 max-w-2xl">
              {event.description}
            </p>
          )}

          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {event.date} {event.time ? `· ${event.time}` : ''}
            </span>

            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </span>

            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {event.attendees || 0} registrados
            </span>
          </div>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={handleAddToCalendar}
          title="Añadir a Google Calendar"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-[#f0f6ff] border border-white/10 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="hidden sm:inline">Google Calendar</span>
        </button>

        <button
          type="button"
          onClick={handleToggle}
          title={isSaved ? 'Quitar de guardados' : 'Guardar evento'}
          className={`p-2 rounded-lg border transition-all ${
            isSaved
              ? 'bg-[#1d6ef5]/20 border-blue-500/40 text-cyan-400'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
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
        </button>

        <Link
          href={`/eventos/${event.slug}`}
          className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/30 transition-all flex items-center justify-center"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
