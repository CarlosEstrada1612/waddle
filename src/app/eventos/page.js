'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockEvents } from '@/lib/mockData';
import EventCard from '@/components/events/EventCard';
import Footer from '@/components/layout/Footer';

function EventsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialModality = searchParams.get('modality') || 'all';

  const [search, setSearch] = useState(initialQuery);
  const [modality, setModality] = useState(initialModality);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter & sort logic
  const filteredEvents = useMemo(() => {
    return mockEvents
      .filter((ev) => {
        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = ev.title.toLowerCase().includes(q);
          const matchOrg = ev.organizer.toLowerCase().includes(q);
          const matchDesc = (ev.description || '').toLowerCase().includes(q);
          const matchTags = (ev.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchOrg && !matchDesc && !matchTags) return false;
        }

        // Modality
        if (modality !== 'all' && ev.modality !== modality) {
          return false;
        }

        // Status
        if (statusFilter !== 'all' && ev.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.attendees || 0) - (a.attendees || 0);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        return 0; // Default relevant
      });
  }, [search, modality, statusFilter, sortBy]);

  // Pagination (9 items per page)
  const pageSize = 9;
  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeFiltersCount =
    (modality !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header section with tech hero background */}
      <section className="relative overflow-hidden pt-8 pb-10 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf812_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Catálogo de eventos
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explorar eventos académicos
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Encuentra workshops, hackathons, conferencias y meetups organizados por agrupaciones universitarias y centros de investigación.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="glass px-4 py-2.5 rounded-xl border border-white/10 text-center">
              <span className="block text-xl font-bold text-cyan-400">24</span>
              <span className="text-[11px] text-[#94a3b8]">Eventos próximos</span>
            </div>
            <div className="glass px-4 py-2.5 rounded-xl border border-white/10 text-center">
              <span className="block text-xl font-bold text-emerald-400">4</span>
              <span className="text-[11px] text-[#94a3b8]">Eventos hoy</span>
            </div>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="max-w-7xl mx-auto mt-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar por nombre, temática, ponente o descripción..."
                className="w-full pl-11 pr-12 py-3 rounded-xl glass-card bg-[#091b38]/90 text-white placeholder-[#94a3b8] text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
              <span className="absolute inset-y-0 right-3 my-auto h-5 px-1.5 rounded bg-white/10 text-[10px] text-[#94a3b8] font-mono flex items-center">
                /
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                showAdvancedFilters || activeFiltersCount > 0
                  ? 'bg-blue-600/30 border-cyan-400 text-cyan-300'
                  : 'glass-card text-white hover:bg-white/10 border-white/10'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Filtros avanzados</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1d6ef5] text-white text-[11px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Collapsible Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 p-4 rounded-xl glass-card border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                  Modalidad
                </label>
                <select
                  value={modality}
                  onChange={(e) => {
                    setModality(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#0a1f3d] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">Todas las modalidades</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                  Estado
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#0a1f3d] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">Todos los estados</option>
                  <option value="PRÓXIMO">Próximos</option>
                  <option value="EN CURSO">En curso</option>
                  <option value="FINALIZADO">Finalizados</option>
                  <option value="CANCELADO">Cancelados</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setModality('all');
                    setStatusFilter('all');
                    setCurrentPage(1);
                  }}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Events Grid Area */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <p className="text-sm text-[#94a3b8]">
            Mostrando{' '}
            <span className="font-semibold text-white">
              {filteredEvents.length} eventos
            </span>{' '}
            encontrados según criterios de búsqueda
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94a3b8]">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0a1f3d] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="relevant">Más relevantes</option>
              <option value="date-asc">Próximos a iniciar</option>
              <option value="popular">Más populares</option>
            </select>
          </div>
        </div>

        {/* Grid or Empty State */}
        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-white">No se encontraron eventos</h3>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-sm mx-auto">
              No hay eventos que coincidan con tus criterios de búsqueda o filtros. Intenta cambiar los términos.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm select-none">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              ← Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  currentPage === num
                    ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/30'
                    : 'glass text-[#94a3b8] hover:text-white hover:bg-white/10'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function EventosPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-white">Cargando eventos...</div>}>
      <EventsContent />
    </Suspense>
  );
}
