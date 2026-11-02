'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockEvents, mockOrganizations, quickTopics, mockUser } from '@/lib/mockData';
import EventCard from '@/components/events/EventCard';
import EventListItem from '@/components/events/EventListItem';
import Footer from '@/components/layout/Footer';

// Icono de campana de notificaciones
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filterOptions = [
    { label: 'Todos', value: 'Todos', icon: '✨' },
    { label: 'Populares', value: 'Populares', icon: '🔥' },
    { label: 'Presenciales', value: 'Presenciales', icon: '📍' },
    { label: 'Virtuales / Híbridos', value: 'Virtuales', icon: '🖥' },
    { label: 'Hackathons & CTF', value: 'Competencias', icon: '🏆' },
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

  const recommendedEvents = mockEvents.slice(0, 4);
  const upcomingEvents = mockEvents.slice(0, 3);
  const followedOrgs = mockOrganizations.filter((o) => o.following);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#020813]">
      
      {/* 
        ========================================
        HERO SECTION (Saludo, Stats y Buscador)
        ========================================
      */}
      {/* Si tienes una imagen en public/, reemplaza 'tu-imagen.jpg'. Si no, usa el color de fondo */}
      <section 
        className="relative pt-6 pb-20 px-6 lg:px-10 bg-cover bg-center border-b border-white/5" 
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(2,8,19,0.4), rgba(2,8,19,1)), url('/fondo-pucp.jpg')", backgroundColor: "#061329" }}
      >
        
        {/* Notificaciones y Avatar (Esquina superior derecha) */}
        <div className="absolute top-6 right-6 lg:right-10 z-20 flex items-center gap-4">
          <button className="relative w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
             <BellIcon />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#020813]"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/20 overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Contenido Principal del Hero */}
        <div className="max-w-7xl mx-auto flex flex-col relative z-10 pt-10 gap-8">
          
          {/* Fila: Textos a la Izquierda / Stats a la Derecha */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              {/* Badge Periodo */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#0a58ca] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                PERIODO ACADÉMICO 2026-1
              </div>

              {/* Saludo */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                Hola, {mockUser.name.split(' ')[0]} 👋
              </h1>

              {/* Subtítulo */}
              <p className="mt-3 text-base sm:text-lg text-slate-200 drop-shadow-md">
                Descubre lo que está pasando en Informática y Ciencias de la Computación.
              </p>
            </div>

            {/* Estadísticas estilo Glassmorphism */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 min-w-[160px] shadow-xl">
                <div className="w-10 h-10 flex items-center justify-center text-white border border-white/30 bg-white/5 rounded-lg text-xl">
                  📅
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white leading-none">14</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Eventos activos</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 min-w-[160px] shadow-xl">
                <div className="w-10 h-10 flex items-center justify-center border border-emerald-400/40 bg-emerald-500/20 rounded-lg text-xl">
                  🛡️
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white leading-none">5</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Tus registros</div>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================
              BARRA DE EXPLORAR Y FILTROS RÁPIDOS 
              ======================================= */}
          <div className="w-full bg-[#0B1A35]/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-4 shadow-2xl shadow-blue-900/20 mt-4">
            {/* Buscador */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 mb-4 bg-[#050D1C] rounded-2xl p-1.5 border border-white/10 transition-all focus-within:border-blue-500/50"
            >
              <div className="pl-4 text-slate-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar eventos, temas o agrupaciones... (ej. hackathon, rust, DSC)"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm md:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <span>Explorar</span>
                <span>→</span>
              </button>
            </form>

            {/* Pastillas (Pills) de Filtro */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 px-2">
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">FILTRO RÁPIDO:</span>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleFilterClick(opt.value)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeFilter === opt.value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================
        CONTENIDO PRINCIPAL (Listas de eventos)
        ========================================
      */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 space-y-16 relative z-20">
        
        {/* Sección 1: "Para ti" */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>✨</span> Para ti
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Personalizado con base en tus etiquetas guardadas: <span className="text-white font-medium">Machine Learning, Cloud y Web Architecture.</span>
              </p>
            </div>

            <Link
              href="/eventos"
              className="text-xs font-semibold text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 shrink-0"
            >
              <span>Ajustar intereses</span>
              <span>⚙️</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Sección 2: "Próximos eventos" */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>📅</span> Próximos eventos
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 font-bold border border-blue-500/20">
                {upcomingEvents.length} EVENTOS
              </span>
            </div>

            <Link
              href="/calendario"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>Ver calendario completo</span>
              <span>→</span>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Sección 3: "Agrupaciones que sigues" */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>👥</span> Agrupaciones que sigues
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold border border-white/10">
                {followedOrgs.length} SOCIEDADES
              </span>
            </div>

            <Link
              href="/agrupaciones"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>Explorar todas las sociedades</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {followedOrgs.map((org) => (
              <div
                key={org.id}
                className="bg-[#0B1528] rounded-2xl p-4 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0"
                    style={{ backgroundColor: org.color }}
                  >
                    {org.initials}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/agrupaciones/${org.id}`}
                      className="text-base font-bold text-white hover:text-blue-400 transition-colors truncate block"
                    >
                      {org.name}
                    </Link>
                    <p className="text-xs text-slate-400 truncate">
                      {org.members} miembros
                    </p>
                  </div>
                </div>

                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 transition-colors">
                  Siguiendo
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sección 4: "Explora por temática" */}
        <section className="bg-[#0B1528] p-8 rounded-3xl border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">🔍</span>
                Explora por temática
              </h2>
              <p className="text-sm text-slate-400 mt-1">Filtrar el ecosistema académico según tu especialización.</p>
            </div>
            <span className="text-xs text-slate-500">{quickTopics.length} categorías activas</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickTopics.map((topic) => (
              <Link
                key={topic}
                href={`/eventos?q=${encodeURIComponent(topic)}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2"
              >
                <span className="text-slate-500">#</span>
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