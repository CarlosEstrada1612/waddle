'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TopBar() {
  const [hasNotifications] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="absolute top-5 right-8 z-50 flex items-center gap-4">
      {/* Bell Notification Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setNotifOpen((prev) => !prev)}
          aria-label="Notificaciones"
          className="relative p-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
        >
          {/* Bell Icon matching mockup */}
          <svg
            className="w-6 h-6 text-white stroke-[2.2]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          {/* Red notification dot with '1' as shown in the mockup */}
          {hasNotifications && (
            <span
              className="absolute top-1 right-1 flex items-center justify-center w-[18px] h-[18px] rounded-full text-[10px] font-bold text-white shadow-md shadow-red-500/60"
              style={{ background: '#ef4444' }}
            >
              1
            </span>
          )}
        </button>

        {/* Notification dropdown */}
        {notifOpen && (
          <div
            className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10,26,55,0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Notificaciones</span>
              <span className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer">
                Marcar todo como leído
              </span>
            </div>
            {[
              {
                title: 'DSC PUCP publicó un nuevo evento',
                body: 'Taller Práctico: Concurrencia en Rust',
                time: 'Hace 5 min',
                unread: true,
              },
              {
                title: 'Recordatorio de evento',
                body: 'AI & Data Night 2026 — mañana a las 18:30',
                time: 'Hace 1 hora',
                unread: false,
              },
              {
                title: 'AAI publicó un nuevo evento',
                body: 'Open Source Day: Contribuyendo a Linux y LLMs',
                time: 'Hace 3 horas',
                unread: false,
              },
            ].map((n, i) => (
              <div
                key={i}
                className="px-4 py-3 flex gap-3 items-start hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
              >
                <div
                  className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: n.unread ? '#1d6ef5' : 'transparent',
                    border: n.unread ? 'none' : '1.5px solid #475569',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/90 leading-snug">{n.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{n.body}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User profile avatar */}
      <div
        className="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-white/15 hover:ring-blue-400/70 transition-all duration-200"
        style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }}
      >
        <Image
          src="https://i.pravatar.cc/80?img=47"
          alt="Mi perfil"
          width={36}
          height={36}
          className="object-cover"
        />
      </div>
    </header>
  );
}
