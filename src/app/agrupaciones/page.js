// Server Component — sin 'use client'
// Consume datos reales de Supabase si hay .env, si no usa mock.
import Link from 'next/link';
import { listOrganizations } from '@/server/organizations';
import OrganizationImage from '@/components/organizations/organization-image';
import Footer from '@/components/layout/Footer';

export const metadata = { title: 'Agrupaciones | Waddle' };
export const dynamic = 'force-dynamic';

export default async function AgrupacionesPage({ searchParams }) {
  const params = await searchParams;
  const page = /^\d{1,6}$/.test(params.pagina ?? '')
    ? Math.max(1, Number(params.pagina))
    : 1;
  const search =
    typeof params.q === 'string' ? params.q.trim().slice(0, 100) : '';
  const order = params.orden === 'za' ? 'za' : 'az';

  const { organizations, count } = await listOrganizations(page, search, order);
  const totalPages = Math.ceil(count / 12) || 1;

  const pageUrl = (n) =>
    `?${new URLSearchParams({ q: search, orden: order, pagina: String(n) })}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* ── HEADER ── */}
      <section className="relative overflow-hidden pt-16 pb-10 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              PERIODO ACADÉMICO 2026-1
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Agrupaciones
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Conoce las agrupaciones de la Facultad de Ciencias de la
              Computación y forma parte de la comunidad.
            </p>
          </div>

          <div className="glass px-5 py-3 rounded-xl border border-white/10 text-center shrink-0 flex items-center gap-3">
            <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="7" r="3" />
              <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3" />
            </svg>
            <div>
              <span className="block text-2xl font-extrabold text-white leading-none">{count}</span>
              <span className="text-xs text-[#94a3b8]">{search ? 'Resultados' : 'Agrupaciones'}</span>
            </div>
          </div>
        </div>

        {/* ── SEARCH FORM ── */}
        <form action="/agrupaciones" className="max-w-7xl mx-auto mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <svg className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <label className="sr-only" htmlFor="org-search">Buscar agrupaciones</label>
              <input
                id="org-search"
                name="q"
                type="text"
                defaultValue={search}
                maxLength={100}
                placeholder="Buscar agrupaciones... (ej. DSC, IA, desarrollo web)"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder-[#94a3b8] focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-sm font-semibold transition-all flex items-center gap-2 shrink-0"
            >
              Buscar
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Sort + clear */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              {search && (
                <Link href="/agrupaciones" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[#94a3b8] hover:text-white transition-all text-xs">
                  ✕ Limpiar búsqueda
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <span>Ordenar por:</span>
              <select
                name="orden"
                defaultValue={order}
                className="bg-[#0a1f3d] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="az">Nombre: A–Z</option>
                <option value="za">Nombre: Z–A</option>
              </select>
              <button
                type="submit"
                className="px-2.5 py-1.5 rounded-lg bg-[#1d6ef5]/20 hover:bg-[#1d6ef5]/40 text-cyan-300 border border-[#1d6ef5]/30 text-xs transition-all"
              >
                Aplicar
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ── ORG GRID ── */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <h2 className="text-sm font-semibold text-white">
            {search ? 'Resultados de búsqueda' : 'Todas las agrupaciones'}
          </h2>
        </div>

        {organizations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizations.map((org) => (
              <OrgCardServer key={org.id} org={org} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl">
            <span className="text-4xl block mb-3">👥</span>
            <h3 className="text-lg font-bold text-white">
              {search ? 'No encontramos agrupaciones' : 'Tu próxima comunidad está por llegar'}
            </h3>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-sm mx-auto">
              {search ? 'Prueba con otro nombre o explora todas.' : 'Aquí aparecerán sus perfiles y actividades.'}
            </p>
            {search && (
              <Link href="/agrupaciones" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d6ef5] text-white text-sm font-semibold">
                Ver todas las agrupaciones
              </Link>
            )}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {(page > 1 || page * 12 < count) && (
          <nav aria-label="Paginación" className="mt-12 flex items-center justify-between gap-4 text-xs text-[#94a3b8]">
            <span>Página <strong className="text-white">{page}</strong> de <strong className="text-white">{totalPages}</strong></span>
            <div className="flex items-center gap-1.5">
              {page > 1 ? (
                <Link href={pageUrl(page - 1)} className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white hover:bg-white/10">
                  ← Anterior
                </Link>
              ) : <span />}
              {page * 12 < count ? (
                <Link href={pageUrl(page + 1)} className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white hover:bg-white/10">
                  Siguiente →
                </Link>
              ) : <span />}
            </div>
          </nav>
        )}
      </div>

      <Footer />
    </div>
  );
}

// ── Org card (server-rendered, no interactivity needed here) ─────────────────
function OrgCardServer({ org }) {
  // org can come from Supabase (nombre, descripcion, logo, portada) or from mock (name, description, color, initials)
  const name = org.nombre || org.name || org.fullName || '?';
  const description = org.descripcion || org.description || '';
  const color = org.color || '#1d6ef5';
  const initials = org.initials || name.slice(0, 2).toUpperCase();

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/30"
      style={{ background: 'linear-gradient(160deg, #0d2044 0%, #091830 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Cover */}
      <div className="relative h-28 overflow-hidden">
        <OrganizationImage src={org.portada} name={name} cover />
        {/* Bookmark */}
        <button
          className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
          aria-label="Guardar agrupación"
        >
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Logo overlapping cover */}
        <div className="flex items-start gap-3 -mt-10">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg ring-2 ring-[#091830]"
            style={{ background: color }}
          >
            {org.logo ? (
              <OrganizationImage src={org.logo} name={name} />
            ) : initials}
          </div>
          <div className="mt-10 min-w-0">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(29,110,245,0.18)', color: '#93c5fd' }}>
              {org.category || 'Agrupación estudiantil'}
            </span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">{name}</h3>

        {org.members !== undefined && (
          <p className="text-xs text-[#94a3b8] flex items-center gap-1">
            <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
            {typeof org.members === 'number' ? `${org.members.toLocaleString()} miembros` : `${org.members?.length ?? 0} integrantes publicados`}
          </p>
        )}

        <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2 flex-1">{description || 'Conoce a la agrupación y descubre quiénes forman parte de su equipo.'}</p>

        <Link
          href={`/agrupaciones/${org.id}`}
          className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Ver perfil
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
