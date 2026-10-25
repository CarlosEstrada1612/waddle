import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockOrganizations, mockEvents } from '@/lib/mockData';
import EventCard from '@/components/events/EventCard';
import Footer from '@/components/layout/Footer';
import OrgProfileTabs from './OrgProfileTabs';

export async function generateStaticParams() {
  return mockOrganizations.map((org) => ({ id: org.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const org = mockOrganizations.find((o) => o.id === id);
  if (!org) return { title: 'Agrupación no encontrada' };
  return {
    title: `${org.name} - ${org.fullName} | Waddle`,
    description: org.description,
  };
}

export default async function AgrupacionDetailPage({ params }) {
  const { id } = await params;
  const org = mockOrganizations.find((o) => o.id === id);

  if (!org) {
    notFound();
  }

  // Filter events belonging to this org
  const orgEvents = mockEvents.filter(
    (e) =>
      (e.organizerIds && e.organizerIds.includes(org.id)) ||
      (e.organizer && e.organizer.toLowerCase().includes(org.initials.toLowerCase()))
  );

  const upcomingEvents = orgEvents.filter(
    (e) => e.status !== 'FINALIZADO' && e.status !== 'CANCELADO'
  );

  const pastEvents = orgEvents.filter(
    (e) => e.status === 'FINALIZADO' || e.status === 'CANCELADO'
  );

  // Fallbacks if list is empty for another org
  const displayUpcoming = upcomingEvents.length > 0 ? upcomingEvents : orgEvents.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#030d1c] text-[#f0f6ff]">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#071428]/80 border-b border-white/10 px-6 lg:px-10 py-3 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/agrupaciones"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>←</span>
            <span>Volver a agrupaciones</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/agrupaciones" className="hover:text-white transition-colors">Agrupaciones</Link>
            <span>/</span>
            <span className="text-white font-medium">{org.name}</span>
          </div>
        </div>
      </div>

      {/* A. Header / Hero */}
      <section className="relative">
        {/* Full-width cover image at top */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 bg-[#071428] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"
            alt={`Portada de ${org.name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlaid gradient from bottom: from-[#030d1c] via-transparent */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030d1c] via-[#030d1c]/40 to-transparent" />

          {/* DSC PUCP logo text overlay in the cover (top right area): org name + subtitle text */}
          <div className="absolute top-5 right-6 sm:right-10 flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md bg-black/45 border border-white/15 shadow-xl">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-md"
              style={{ backgroundColor: org.color || '#1d6ef5' }}
            >
              {org.initials}
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">
                {org.name}
              </div>
              <div className="text-[10px] text-cyan-300">
                Capítulo Oficial PUCP · Google Tech
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative -mt-16 sm:-mt-20 z-20 pb-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Left: Logo square + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Org logo square positioned to overlap the cover */}
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center font-extrabold text-3xl sm:text-4xl text-white shadow-2xl border-4 border-[#030d1c] shrink-0"
                style={{ backgroundColor: org.color || '#1d6ef5' }}
              >
                {org.initials}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category badge (pill) */}
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30">
                    {org.category}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-medium border border-blue-500/20">
                    Comunidad Oficial
                  </span>
                </div>

                {/* Org name (large, bold) */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {org.name}
                </h1>

                {/* Full name (subtitle gray) */}
                <p className="text-sm sm:text-base text-[#94a3b8]">
                  {org.fullName}
                </p>

                {/* Member count + "Fundada en 2019" metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#94a3b8] pt-1">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <span>👥</span>
                    <span>{(org.members || 1240).toLocaleString()} miembros</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <span>🗓️</span>
                    <span>Fundada en 2019</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span>Pabellón V, Campus PUCP</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: "Siguiendo ▾" dropdown button + bookmark icon */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>Siguiendo</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Guardar agrupación"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-cyan-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        {/* B & C. Tabs Navigation & Tab Content (Client Component) */}
        <OrgProfileTabs
          org={org}
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
        />

        {/* D. "Próximos eventos" Section (always shown below tabs) */}
        <section className="mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📅</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Próximos eventos
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
                {displayUpcoming.length}
              </span>
            </div>

            <Link
              href="/eventos"
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
            >
              <span>Ver todos</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayUpcoming.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* E. "Logros y reconocimientos" Section */}
        <section className="mt-16 mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Logros y reconocimientos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4">
                👥
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                40+
              </div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                Eventos realizados
              </div>
              <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                Talleres prácticos, hackathons de código y charlas técnicas impartidas desde 2019.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                3+
              </div>
              <div className="text-sm font-semibold text-amber-300 mt-1">
                Años de actividad
              </div>
              <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                Crecimiento sostenido e impacto formativo en la facultad de Ciencias e Ingeniería.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-2xl mb-4">
                💙
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Comunidad activa
              </div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                en toda la PUCP
              </div>
              <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                Más de 1,200 miembros conectados mediante canales de Discord, talleres y proyectos colaborativos.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* F. Footer */}
      <Footer />
    </div>
  );
}
