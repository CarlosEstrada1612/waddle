'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatusBadge from '@/components/layout/StatusBadge';

export default function EventCard({ event, compact = false }) {
  const [isSaved, setIsSaved] = useState(event.saved ?? false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden glass-card hover:border-cyan-400/40 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
    >
      {/* Event Image & overlays */}
      <div className="relative w-full h-44 bg-[#0a1f3d] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3d] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <StatusBadge status={event.status} />

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={toggleBookmark}
            aria-label={isSaved ? 'Quitar de guardados' : 'Guardar evento'}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/40'
                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
            }`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        {/* Modality badge bottom right of image */}
        <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 backdrop-blur-sm text-cyan-300 border border-white/10">
          {event.modality}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Organizer */}
          <p className="text-xs font-medium text-cyan-400 tracking-wide uppercase mb-1">
            {event.organizer}
          </p>

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 line-clamp-1 transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          {!compact && event.description && (
            <p className="mt-1.5 text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
          {/* Metadata row: Date & Location */}
          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
            <div className="flex items-center gap-1.5 truncate">
              <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="truncate">{event.date}</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate max-w-[120px]">{event.location}</span>
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-900/30 text-blue-200 border border-blue-500/20"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
              {event.tags.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                  +{event.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action button */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-[#94a3b8] flex items-center gap-1">
              <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {event.attendees || 0} registrados
            </span>

            <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Ver detalles <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
