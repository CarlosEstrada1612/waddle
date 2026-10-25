'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockEvents, mockOrganizations, quickTopics, mockUser } from '@/lib/mockData';
import EventCard from '@/components/events/EventCard';
import EventListItem from '@/components/events/EventListItem';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filterOptions = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Populares 🔥', value: 'Populares' },
    { label: 'Presenciales 📍', value: 'Presenciales' },
    { label: 'Virtuales/Híbridos 🖥', value: 'Virtuales' },
    { label: 'Hackathons & CTF 🏆', value: 'Competencias' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/eventos?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/eventos');
    }
  };

  const handleFilterClick = (val) => {
    setActiveFilter(val);
    if (val === 'Todos') return;
    if (val === 'Presenciales') router.push('/eventos?modality=Presencial');
    else if (val === 'Virtuales') router.push('/eventos?modality=Virtual');
    else if (val === 'Competencias') router.push('/eventos?tag=Hackathon');
    else if (val === 'Populares') router.push('/eventos?sort=popular');
  };

  // 4 events for "Para ti" section
  const recommendedEvents = mockEvents.slice(0, 4);

  // 3 next events for "Próximos eventos"
  const upcomingEvents = mockEvents.slice(0, 3);

  // Followed organizations
  const followedOrgs = mockOrganizations.filter((o) => o.following);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-8 pb-12 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051124] to-[#030d1c]">
        {/* Background glow and decorative ambient lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            {/* Period badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              PERIODO ACADÉMICO 2026-1
            </div>

            {/* Greeting */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hola, {mockUser.name.split(' ')[0]} 👋
            </h1>

            {/* Subtitle */}
            <p className="mt-2.5 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              Descubre lo que está pasando en Informática y Ciencias de la Computación en la PUCP.
            </p>

            {/* Stats row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-cyan-400 font-bold">
                  14
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Eventos activos</p>
                  <p className="text-[10px] text-[#94a3b8]">En este ciclo</p>
                </div>
              </div>

              <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-400 font-bold">
                  5
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Tus registros</p>
                  <p className="text-[10px] text-[#94a3b8]">Asistencia confirmada</p>
                </div>
              </div>

              <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold">
                  12
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Guardados</p>
                  <p className="text-[10px] text-[#94a3b8]">En tu biblioteca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic 3D Waddle Orb graphic representation */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-700 via-cyan-500 to-indigo-900 shadow-[0_0_60px_rgba(56,189,248,0.35)] flex items-center justify-center border border-white/20 relative group">
              <div className="absolute inset-2 rounded-full border border-white/30 animate-[spin_20s_linear_infinite]" />
              <div className="text-6xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
                🐧
              </div>
              <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-[#071428]/90 border border-cyan-400/40 text-[10px] text-cyan-300 font-bold tracking-wider uppercase">
                Campus PUCP
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="max-w-4xl mx-auto mt-10 relative z-10">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 p-1.5 rounded-2xl glass-card border-cyan-500/20 shadow-2xl bg-[#091b38]/90"
          >
            <div className="pl-4 text-[#94a3b8]">
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar eventos, temas o agrupaciones... (ej. hackathon, rust, DSC)"
              className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-[#94a3b8] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-sm font-semibold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
            >
              <span>Explorar</span>
              <span>→</span>
            </button>
          </form>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleFilterClick(opt.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === opt.value
                    ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/25'
                    : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 space-y-12">
        {/* Section 1: "Para ti" */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  ✨ Para ti
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20">
                  RECOMENDADO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                Personalizado con base en tus etiquetas guardadas:{' '}
                <span className="text-cyan-300 font-medium">Machine Learning, Cloud y Web Architecture.</span>
              </p>
            </div>

            <Link
              href="/eventos"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Ajustar intereses</span>
              <span>⚙️</span>
            </Link>
          </div>

          {/* Responsive 4 cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Section 2: "Próximos eventos" */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                📅 Próximos eventos
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 font-bold">
                {upcomingEvents.length} EVENTOS
              </span>
            </div>

            <Link
              href="/calendario"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Ver calendario completo</span>
              <span>→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Section 3: "Agrupaciones que sigues" */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                👥 Agrupaciones que sigues
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold">
                {followedOrgs.length} SOCIEDADES
              </span>
            </div>

            <Link
              href="/agrupaciones"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Explorar todas las sociedades</span>
              <span>→</span>
            </Link>
          </div>

          {/* Row of org pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {followedOrgs.map((org) => (
              <div
                key={org.id}
                className="glass-card p-3.5 flex items-center justify-between gap-3 hover:border-cyan-400/40 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-md"
                    style={{ backgroundColor: org.color }}
                  >
                    {org.initials}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/agrupaciones/${org.id}`}
                      className="text-sm font-bold text-white hover:text-cyan-300 transition-colors truncate block"
                    >
                      {org.name}
                    </Link>
                    <p className="text-[11px] text-[#94a3b8] truncate">
                      {org.members} miembros
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-blue-600/20 text-cyan-400 border border-blue-500/30 shrink-0">
                  Siguiendo
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: "Explora por temática" */}
        <section className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔍</span>
              <span>Explora por temática</span>
            </h2>
            <span className="text-xs text-[#94a3b8]">9 categorías activas</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {quickTopics.map((topic) => (
              <Link
                key={topic}
                href={`/eventos?q=${encodeURIComponent(topic)}`}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-[#1d6ef5] text-slate-200 hover:text-white border border-white/10 hover:border-blue-400 transition-all flex items-center gap-2"
              >
                <span>#</span>
                <span>{topic}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
