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
  const [sortBy, setSortBy] = useState(searchParams.get('sort') === 'popular' ? 'popular' : 'relevant');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
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
        if (modality !== 'all' && !(modality === 'online' ? ['Virtual', 'Híbrido'].includes(ev.modality) : ev.modality === modality)) {
          return false;
        }

        if (tag && !(ev.tags || []).some((value) => value.toLowerCase().includes(tag.toLowerCase()))) return false;

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
  }, [search, modality, statusFilter, sortBy, tag]);

  // Pagination (9 items per page)
  const pageSize = 9;
  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeFiltersCount =
    (modality !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0) + (tag ? 1 : 0);

  return (
    <div className="events-aero flex-1 flex flex-col min-h-screen">
      {/* ── TOP ROUNDED HEADER MODULE (not glued to top, rounded card with margin) ── */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-4">
        <div
          className="events-hero relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-sky-400/25 shadow-2xl shadow-sky-950/60"
          style={{
            background:
              'linear-gradient(135deg, rgba(12, 36, 77, 0.92) 0%, rgba(9, 28, 60, 0.88) 45%, rgba(6, 20, 42, 0.94) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Subtle cyan glow behind orb */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 w-96 h-96 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(29,110,245,0.08) 50%, transparent 75%)',
            }}
          />

          {/* 3D Orb Graphic on the right side */}
          <div
            aria-hidden="true"
            className="events-orb absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
            style={{ width: 190, height: 190, zIndex: 0 }}
          >
            <div
              style={{
                width: 190,
                height: 190,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 38% 30%, rgba(195,235,255,0.95) 0%, rgba(56,189,248,0.88) 22%, rgba(29,110,245,0.72) 48%, rgba(8,40,110,0.58) 75%, rgba(3,13,28,0.25) 100%)',
                boxShadow:
                  '0 0 70px 26px rgba(56,189,248,0.25), 0 0 140px 52px rgba(29,110,245,0.12)',
              }}
            />
            {/* Inner highlight */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                left: '20%',
                width: '38%',
                height: '24%',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(255,255,255,0.65) 0%, transparent 80%)',
                filter: 'blur(4px)',
              }}
            />
          </div>

          {/* Header Content Top Row */}
          <div
            className="events-heading relative flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ zIndex: 1, paddingRight: 'clamp(0px, 15vw, 220px)' }}
          >
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Explorar eventos académicos
              </h1>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed max-w-lg text-[#94a3b8]">
                Encuentra workshops, hackathons, conferencias y meetups organizados por agrupaciones universitarias y centros de investigación.
              </p>
            </div>

            {/* Stat Badges */}
            <div className="events-stats flex items-center gap-3 shrink-0">
              <div
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl border border-white/10"
                style={{ background: 'rgba(11, 33, 70, 0.85)', backdropFilter: 'blur(12px)' }}
              >
                <svg
                  className="w-5 h-5 text-[#38bdf8] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <span className="block text-2xl font-bold text-white leading-none">24</span>
                  <span className="text-[11px] text-[#94a3b8]">Eventos próximos</span>
                </div>
              </div>

              <div
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl border border-white/10"
                style={{ background: 'rgba(11, 33, 70, 0.85)', backdropFilter: 'blur(12px)' }}
              >
                <svg
                  className="w-5 h-5 text-[#22c55e] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <div>
                  <span className="block text-2xl font-bold text-white leading-none">4</span>
                  <span className="text-[11px] text-[#94a3b8]">Eventos hoy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar (inside card) */}
          <div className="events-search relative mt-8" style={{ zIndex: 1 }}>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#071731] border border-white/10 text-white placeholder-[#94a3b8] text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
                <span className="absolute inset-y-0 right-3 my-auto h-5 px-1.5 rounded bg-white/10 text-[10px] text-[#94a3b8] font-mono flex items-center">
                  /
                </span>
              </div>

              {/* Filtros avanzados button (blue) */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-5 py-3 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-sm font-semibold transition-all flex items-center gap-2.5 shadow-lg shadow-blue-500/25 shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                <span>Filtros avanzados</span>
                <span className="w-5 h-5 rounded-full bg-black/40 text-white text-[11px] flex items-center justify-center font-bold">
                  {activeFiltersCount > 0 ? activeFiltersCount : 3}
                </span>
              </button>
            </div>

            {/* Collapsible Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 p-4 rounded-xl bg-[#071731]/95 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <option value="online">Virtuales / Híbridos</option>
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
                      setTag('');
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
        </div>
      </section>

      {/* ── Main Events Grid Area (outside of the header card) ── */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-6 flex-1">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <p className="text-sm text-[#94a3b8] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-400 inline-block" />
            <span>
              Mostrando <span className="font-semibold text-white">{filteredEvents.length} eventos</span> encontrados según criterios de búsqueda
            </span>
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94a3b8]">Ordenar por:</span>
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
          <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event, index) => (
              <EventCard key={event.id} event={event} eager={index < 3} />
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
          <div className="events-pagination mt-12 flex items-center justify-center gap-2 text-sm select-none">
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

function EventsContentWithQuery() {
  const searchParams = useSearchParams();
  return <EventsContent key={searchParams.toString()} />;
}

export default function EventosPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-white">Cargando eventos...</div>}>
      <EventsContentWithQuery />
    </Suspense>
  );
}
