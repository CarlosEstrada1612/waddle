'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockEvents } from '@/lib/mockData';
import EventListItem from '@/components/events/EventListItem';
import Footer from '@/components/layout/Footer';

export default function GuardadosPage() {
  // Start with all events where saved: true (or mock list)
  const [savedEventIds, setSavedEventIds] = useState(() =>
    mockEvents.filter((e) => e.saved).map((e) => e.id)
  );

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Handle unsave
  const handleUnsave = (id) => {
    setSavedEventIds((prev) => prev.filter((item) => item !== id));
  };

  const savedEvents = useMemo(() => {
    return mockEvents
      .filter((ev) => savedEventIds.includes(ev.id))
      .filter((ev) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = ev.title.toLowerCase().includes(q);
          const matchOrg = ev.organizer.toLowerCase().includes(q);
          if (!matchTitle && !matchOrg) return false;
        }
        if (statusFilter !== 'all' && ev.status !== statusFilter) {
          return false;
        }
        return true;
      });
  }, [savedEventIds, search, statusFilter]);

  const totalPages = Math.ceil(savedEvents.length / pageSize) || 1;
  const paginatedEvents = savedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddAllToCalendar = () => {
    if (savedEvents.length === 0) return;
    const firstEvent = savedEvents[0];
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      firstEvent.title
    )}&details=${encodeURIComponent(
      `Eventos guardados en Waddle PUCP: ${savedEvents.map((e) => e.title).join(', ')}`
    )}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden pt-8 pb-10 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Colección personal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>🔖</span>
              <span>Tus eventos guardados</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Aquí encontrarás todos los eventos que has guardado para no perderte ninguna oportunidad académica o de networking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass px-4 py-2.5 rounded-xl border border-white/10 text-center">
              <span className="block text-xl font-bold text-cyan-400">
                {savedEventIds.length}
              </span>
              <span className="text-[11px] text-[#94a3b8]">eventos guardados</span>
            </div>
            <div className="glass px-4 py-2.5 rounded-xl border border-white/10 text-center hidden sm:block">
              <span className="block text-xl font-bold text-amber-400">⭐</span>
              <span className="text-[11px] text-[#94a3b8]">No te los pierdas</span>
            </div>
          </div>
        </div>

        {/* Search, Filter & Add All to Calendar */}
        <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filtrar por nombre u organizador..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-card text-white text-xs placeholder-[#94a3b8] focus:outline-none focus:border-cyan-400"
              />
              <svg
                className="w-4 h-4 text-cyan-400 absolute left-3 top-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#0a1f3d] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 shrink-0"
            >
              <option value="all">Todos los estados</option>
              <option value="PRÓXIMO">Próximos</option>
              <option value="EN CURSO">En curso</option>
              <option value="FINALIZADO">Finalizados</option>
              <option value="CANCELADO">Cancelados</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddAllToCalendar}
            disabled={savedEvents.length === 0}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Añadir todo a Google Calendar</span>
          </button>
        </div>
      </section>

      {/* Events List */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        {paginatedEvents.length > 0 ? (
          <div className="space-y-4">
            {paginatedEvents.map((event) => (
              <EventListItem
                key={event.id}
                event={event}
                showImage={true}
                onUnsave={handleUnsave}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <span className="text-4xl block mb-3">🔖</span>
            <h3 className="text-lg font-bold text-white">No tienes eventos guardados</h3>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-sm mx-auto mb-6">
              Explora el catálogo y marca los eventos que te interesen para guardarlos aquí.
            </p>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs font-semibold shadow-md transition-all"
            >
              <span>Explorar eventos</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Pagination summary & buttons */}
        {savedEvents.length > 0 && (
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
            <p>
              Mostrando{' '}
              <span className="font-semibold text-white">
                {Math.min((currentPage - 1) * pageSize + 1, savedEvents.length)}-
                {Math.min(currentPage * pageSize, savedEvents.length)}
              </span>{' '}
              de <span className="font-semibold text-white">{savedEvents.length}</span> guardados
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40"
                >
                  ← Anterior
                </button>
                <span className="text-xs text-white font-medium px-2">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
