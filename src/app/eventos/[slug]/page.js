import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockEvents, mockOrganizations } from '@/lib/mockData';
import StatusBadge from '@/components/layout/StatusBadge';
import Footer from '@/components/layout/Footer';
import EventActions from './EventActions';

export async function generateStaticParams() {
  return mockEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = mockEvents.find((e) => e.slug === slug);
  if (!event) return { title: 'Evento no encontrado' };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = mockEvents.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // Find organizer details if available
  const organizers = (event.organizerIds || []).map((orgId) =>
    mockOrganizations.find((o) => o.id === orgId)
  ).filter(Boolean);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location + ' PUCP'
  )}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Top Breadcrumb navigation */}
      <div className="bg-[#051124] border-b border-white/10 px-6 lg:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>←</span>
            <span>Volver a explorar</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/eventos" className="hover:text-white">Eventos</Link>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Image Section */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border-white/10">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071428] via-transparent to-black/30" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-cyan-300 border border-white/20">
                  Evento académico
                </span>
                <StatusBadge status={event.status} />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                  {event.organizer}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                  {event.title}
                </h1>
              </div>
            </div>

            {/* Topic tags */}
            {event.tags && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-600/15 text-cyan-300 border border-blue-500/25"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            )}

            {/* "Acerca del evento" section */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📖</span>
                <span>Acerca del evento</span>
              </h2>

              <div className="text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line space-y-4">
                {event.longDescription || event.description}
              </div>
            </div>

            {/* Features Grid */}
            {event.features && event.features.length > 0 && (
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>✨</span>
                  <span>¿Qué incluye este evento?</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {event.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-1.5"
                    >
                      <span className="text-xl">
                        {idx === 0 ? '🎤' : idx === 1 ? '🤝' : idx === 2 ? '💬' : '🎁'}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <span>🎙️</span>
                  <span>Ponentes destacados</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.speakers.map((spk, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
                    >
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-cyan-400/40">
                        <Image
                          src={spk.avatar}
                          alt={spk.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-sm font-bold text-white">{spk.name}</h4>
                      <p className="text-xs text-cyan-300 font-medium mt-0.5">{spk.role}</p>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">{spk.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
            <div className="glass-card p-6 rounded-2xl border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
                  INFORMACIÓN DEL EVENTO
                </span>
                <StatusBadge status={event.status} />
              </div>

              <div className="py-4 space-y-4">
                {/* Organizers */}
                <div>
                  <span className="text-[11px] text-[#94a3b8] uppercase font-semibold block mb-1.5">
                    Organizado por
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {organizers.length > 0 ? (
                      organizers.map((org) => (
                        <Link
                          key={org.id}
                          href={`/agrupaciones/${org.id}`}
                          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                        >
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                            style={{ backgroundColor: org.color }}
                          >
                            {org.initials}
                          </span>
                          <span>{org.name}</span>
                        </Link>
                      ))
                    ) : (
                      <span className="text-xs text-white font-medium">{event.organizer}</span>
                    )}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{event.date}</p>
                    <p className="text-xs text-[#94a3b8]">{event.time || '18:00 - 21:00'}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">{event.location}</p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>Ver en Google Maps</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Modality & Attendees */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-[#94a3b8] block uppercase font-medium">Modalidad</span>
                    <span className="text-xs font-bold text-white">{event.modality}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-[#94a3b8] block uppercase font-medium">Inscritos</span>
                    <span className="text-xs font-bold text-cyan-300">{event.attendees || 0} personas</span>
                  </div>
                </div>
              </div>

              {/* Client interactive action buttons & share */}
              <EventActions event={event} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
