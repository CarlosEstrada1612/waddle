'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

const calendarEvents = [
  {
    id: 1,
    title: 'Workshop de Machine Learning',
    date: '2026-11-03',
    time: '10:00',
    timeSpan: '10:00 - 13:00 · 3 horas',
    color: '#1d6ef5',
    status: 'PRÓXIMO',
    category: '🤖 Taller práctico',
    badgeOverlay: 'TALLER OFICIAL',
    organizer: 'DSC PUCP & Data Science Club',
    location: 'Laboratorio 201, Pabellón V',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    description: 'Entrenamiento intensivo en modelos supervisados, clasificación y regresión utilizando PyTorch y Scikit-Learn.',
    slug: 'workshop-machine-learning',
    registered: false,
  },
  {
    id: 2,
    title: 'Charla: Futuro del Cloud',
    date: '2026-11-05',
    time: '18:00',
    timeSpan: '18:00 - 20:00 · 2 horas',
    color: '#22c55e',
    status: 'EN CURSO',
    category: '☁️ Cloud Computing',
    badgeOverlay: 'SESIÓN EN VIVO',
    organizer: 'Cloud Computing Club',
    location: 'Auditorio M, Campus PUCP',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    description: 'Tendencias emergentes en computación serverless, orquestación distribuida y optimización de costos en infraestructuras cloud.',
    slug: 'cloud-bootcamp-aws-gcp',
    registered: true,
  },
  {
    id: 3,
    title: 'Hackathon IA 48h',
    date: '2026-11-07',
    time: '09:00',
    timeSpan: '09:00 - 18:00 · Fin de semana',
    color: '#1d6ef5',
    status: 'PRÓXIMO',
    category: '🚀 Hackathon',
    badgeOverlay: 'COMPETENCIA 48H',
    organizer: 'AAI & DSC PUCP',
    location: 'Sala Turing + Discord',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    description: '48 horas ininterrumpidas de desarrollo de soluciones con LLMs locales, agentes de razonamiento y APIs avanzadas.',
    slug: 'hackathon-ia-48h',
    registered: true,
  },
  {
    id: 4,
    title: 'AI & Data Night 2026',
    date: '2026-11-14',
    time: '19:30',
    timeSpan: '18:30 - 21:30 · 3 horas',
    color: '#1d6ef5',
    status: 'PRÓXIMO',
    category: '🎓 Evento académico',
    badgeOverlay: 'KEYNOTE INAUGURAL',
    organizer: 'DSC & Data Science Community',
    location: 'Auditorio CS, Pabellón V',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    description: 'La AI & Data Night 2026 es el evento académico más importante del año, reuniendo a estudiantes, investigadores y profesionales para explorar cómo la Inteligencia Artificial y la Ciencia de Datos están transformando el mundo.',
    slug: 'ai-data-night-2026',
    registered: true,
  },
  {
    id: 5,
    title: 'CTF de Ciberseguridad',
    date: '2026-11-15',
    time: '10:00',
    timeSpan: '10:00 - 14:00 · 4 horas',
    color: '#7c3aed',
    status: 'PRÓXIMO',
    category: '🛡️ Ciberseguridad',
    badgeOverlay: 'TORNEO CTF',
    organizer: 'Cybersecurity Club (CySec PUCP)',
    location: 'Virtual (Discord)',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    description: 'Competencia técnica de hacking ético con retos en criptografía, análisis forense, seguridad web y explotación de binarios.',
    slug: 'ctf-training',
    registered: false,
  },
  {
    id: 6,
    title: 'Rust Distribuido',
    date: '2026-11-18',
    time: '19:00',
    timeSpan: '19:00 - 21:00 · 2 horas',
    color: '#1d6ef5',
    status: 'PRÓXIMO',
    category: '⚙️ Sistemas Concurrentes',
    badgeOverlay: 'WORKSHOP',
    organizer: 'Open Source PUCP & ACM',
    location: 'Lab. Redes y Computación',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    description: 'Patrones de concurrencia y construcción de servicios seguros contra fallos de memoria empleando el ecosistema de Rust y Tokio.',
    slug: 'open-source-day',
    registered: false,
  },
  {
    id: 7,
    title: 'Kubernetes Workshop',
    date: '2026-11-21',
    time: '15:00',
    timeSpan: '15:00 - 18:00 · 3 horas',
    color: '#7c3aed',
    status: 'PRÓXIMO',
    category: '☁️ Infraestructura',
    badgeOverlay: 'HANDS-ON',
    organizer: 'Cloud Computing Club & DSC',
    location: 'Virtual (Twitch Tech)',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    description: 'Despliegues con Helm, orquestación de clústeres multizona, observabilidad con Prometheus y gestión declarativa.',
    slug: 'kubernetes-workshop',
    registered: false,
  },
  {
    id: 8,
    title: 'Women in Tech Panel',
    date: '2026-11-25',
    time: '17:00',
    timeSpan: '17:00 - 19:30 · 2.5 horas',
    color: '#ec4899',
    status: 'PRÓXIMO',
    category: '💜 Liderazgo & Carrera',
    badgeOverlay: 'MESA REDONDA',
    organizer: 'Women in Tech CS PUCP',
    location: 'Auditorio Central',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    description: 'Panel magistral de ingenieras senior sobre escalabilidad técnica, diseño de sistemas y desarrollo de carrera en empresas globales.',
    slug: 'wit-meetup-liderazgo',
    registered: true,
  },
  {
    id: 9,
    title: 'Simulación ICPC',
    date: '2026-11-28',
    time: '09:00',
    timeSpan: '09:00 - 14:00 · 5 horas',
    color: '#f97316',
    status: 'PRÓXIMO',
    category: '🏆 Algoritmia Competitiva',
    badgeOverlay: 'COMPETENCIA OFICIAL',
    organizer: 'ACM Student Chapter & Progra Comp.',
    location: 'Lab. Redes y Computación',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    description: 'Ensayo general formato ICPC de 5 horas con resolución colaborativa de problemas algorítmicos y ranking en tiempo real.',
    slug: 'simulacion-icpc-2026',
    registered: false,
  },
];

const monthNamesSpanish = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

export default function CalendarioPage() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); // 10 = Noviembre (0-indexed)
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [viewMode, setViewMode] = useState('mes'); // 'mes' | 'semana' | 'año'
  const [showFilters, setShowFilters] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showRegistrationStatus, setShowRegistrationStatus] = useState(false);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  const handleResetToday = () => {
    setCurrentYear(2026);
    setCurrentMonthIndex(10);
    setSelectedDate('2026-11-14');
  };

  // Generate 6 weeks × 7 days = 42 cells
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  const daysInCurrentMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

  const calendarDays = [];

  // 1. Leading days from previous month
  const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    const mStr = String(prevMonthIndex + 1).padStart(2, '0');
    const dStr = String(dayNumber).padStart(2, '0');
    calendarDays.push({
      dateStr: `${prevYear}-${mStr}-${dStr}`,
      dayNumber,
      isCurrentMonth: false,
    });
  }

  // 2. Current month days
  const currMStr = String(currentMonthIndex + 1).padStart(2, '0');
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dStr = String(d).padStart(2, '0');
    calendarDays.push({
      dateStr: `${currentYear}-${currMStr}-${dStr}`,
      dayNumber: d,
      isCurrentMonth: true,
    });
  }

  // 3. Trailing days from next month to reach 42 cells (6 rows × 7 days)
  const remainingCells = 42 - calendarDays.length;
  const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
  const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
  const nextMStr = String(nextMonthIndex + 1).padStart(2, '0');
  for (let d = 1; d <= remainingCells; d++) {
    const dStr = String(d).padStart(2, '0');
    calendarDays.push({
      dateStr: `${nextYear}-${nextMStr}-${dStr}`,
      dayNumber: d,
      isCurrentMonth: false,
    });
  }

  // Find events for selected day
  const selectedDayEvents = calendarEvents.filter((ev) => ev.date === selectedDate);
  const primarySelectedEvent =
    selectedDayEvents.length > 0
      ? selectedDayEvents[0]
      : calendarEvents.find((ev) => ev.id === 4); // Default to AI & Data Night 2026

  // Formatted date string for title
  const formatDayTitle = (dateStr) => {
    if (!dateStr) return '14 de noviembre';
    const [, m, d] = dateStr.split('-').map(Number);
    const monthName = monthNamesSpanish[m - 1].toLowerCase();
    return `${d} de ${monthName}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#030d1c] text-[#f0f6ff]">
      {/* Header Section */}
      <section className="pt-8 pb-6 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            {/* Period badge: PERIODO ACADÉMICO 2026-1 (small blue pill top-left) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              PERIODO ACADÉMICO 2026-1
            </div>

            {/* Title: Calendario de Eventos */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>📅</span>
              <span>Calendario de Eventos</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-2xl leading-relaxed">
              Monitorea fechas límite de inscripción, hackathons y conferencias sin solapamientos con exámenes.
            </p>
          </div>

          {/* View toggle buttons (top-right of header): Mes (Activo) | Semana | Año */}
          <div className="flex items-center p-1 rounded-xl bg-[#0a1f3d] border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('mes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'mes'
                  ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/30'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              Mes {viewMode === 'mes' && '(Activo)'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('semana')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'semana'
                  ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/30'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              Semana
            </button>
            <button
              type="button"
              onClick={() => setViewMode('año')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'año'
                  ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/30'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              Año
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        {/* Calendar Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          {/* Left: ‹ Hoy › navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              title="Mes anterior"
              className="w-9 h-9 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleResetToday}
              className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors cursor-pointer hover:border-cyan-400/30"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              title="Mes siguiente"
              className="w-9 h-9 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Center: Month + Year display with dropdown caret */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {monthNamesSpanish[currentMonthIndex]} {currentYear}
            </span>
            <span className="text-cyan-400 text-sm">▾</span>
          </div>

          {/* Right: ⚙ Filtros avanzados 3 button */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer hover:border-cyan-400/40"
            >
              <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Filtros avanzados</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1d6ef5] text-white">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Bar */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex flex-wrap items-center gap-3 animate-in fade-in duration-200">
            <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
              Filtros activos:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-medium border border-blue-500/30">
              <span>Categoría: Todas</span>
              <button type="button" className="text-xs hover:text-white cursor-pointer">×</button>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-medium border border-blue-500/30">
              <span>Modalidad: Presencial y Virtual</span>
              <button type="button" className="text-xs hover:text-white cursor-pointer">×</button>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-medium border border-blue-500/30">
              <span>Organizador: Todos los Capítulos</span>
              <button type="button" className="text-xs hover:text-white cursor-pointer">×</button>
            </span>
          </div>
        )}

        {/* Monthly Calendar View */}
        {viewMode === 'mes' && (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
            {/* Column headers: LUN | MAR | MIÉ | JUE | VIE | SÁB | DOM */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3 text-center">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-xs sm:text-sm font-bold text-cyan-400 tracking-wider uppercase"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid: 6 weeks (rows) × 7 days */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {calendarDays.map((cell) => {
                const dayEvents = calendarEvents.filter((ev) => ev.date === cell.dateStr);
                const isSelected = selectedDate === cell.dateStr;
                const isToday = cell.dateStr === '2026-11-14';
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(cell.dateStr)}
                    className={`min-h-[88px] sm:min-h-[110px] p-2 sm:p-2.5 rounded-xl text-left flex flex-col justify-between transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/25 border-cyan-400 ring-2 ring-cyan-400/40 shadow-xl shadow-blue-500/20'
                        : hasEvents
                        ? 'bg-[#0a1f3d]/70 border-white/10 hover:border-cyan-400/40 hover:bg-[#0e274c]'
                        : cell.isCurrentMonth
                        ? 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                        : 'bg-transparent border-transparent opacity-35 hover:opacity-60'
                    }`}
                  >
                    {/* Top of cell: Day number + Today circle */}
                    <div className="flex items-center justify-between w-full">
                      {isToday ? (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1d6ef5] text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-blue-500/40">
                          {cell.dayNumber}
                        </div>
                      ) : (
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isSelected
                              ? 'text-cyan-300'
                              : cell.isCurrentMonth
                              ? 'text-white'
                              : 'text-slate-500'
                          }`}
                        >
                          {cell.dayNumber}
                        </span>
                      )}

                      {/* Small dot indicator for mobile */}
                      {hasEvents && (
                        <span
                          className="sm:hidden w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: dayEvents[0].color || '#1d6ef5' }}
                        />
                      )}
                    </div>

                    {/* Event chips below: time + truncated title */}
                    <div className="space-y-1 w-full mt-1.5">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded truncate text-white shadow-sm flex items-center gap-1 leading-tight"
                          style={{ backgroundColor: ev.color || '#1d6ef5' }}
                          title={`${ev.time} - ${ev.title}`}
                        >
                          <span className="opacity-80 text-[8px] sm:text-[9px] shrink-0 font-mono">
                            {ev.time}
                          </span>
                          <span className="truncate">{ev.title}</span>
                        </div>
                      ))}

                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-cyan-400 font-bold pl-0.5">
                          +{dayEvents.length - 2} más
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Alternate view for Semana */}
        {viewMode === 'semana' && (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Vista Semanal: 09 al 15 de Noviembre 2026
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['2026-11-09', '2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15'].map((dStr, idx) => {
                const dayEvs = calendarEvents.filter((e) => e.date === dStr);
                const isSelected = selectedDate === dStr;
                return (
                  <div
                    key={dStr}
                    onClick={() => setSelectedDate(dStr)}
                    className={`p-3 rounded-xl border cursor-pointer min-h-[160px] flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-600/20 border-cyan-400'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-cyan-400">{weekDays[idx]}</div>
                      <div className="text-lg font-extrabold text-white">{dStr.split('-')[2]}</div>
                    </div>
                    <div className="space-y-1 mt-2">
                      {dayEvs.map((e) => (
                        <div
                          key={e.id}
                          className="text-[10px] p-1 rounded font-semibold text-white truncate"
                          style={{ backgroundColor: e.color }}
                        >
                          {e.time} {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Alternate view for Año */}
        {viewMode === 'año' && (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Planificación Anual 2026
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {monthNamesSpanish.map((mName, mIdx) => (
                <button
                  key={mName}
                  type="button"
                  onClick={() => {
                    setCurrentMonthIndex(mIdx);
                    setViewMode('mes');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    mIdx === currentMonthIndex
                      ? 'bg-blue-600/20 border-cyan-400 text-white'
                      : 'bg-white/5 border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{mName}</div>
                  <div className="text-xs text-cyan-400 mt-1">
                    {mIdx === 10 ? '9 eventos clave' : 'Actividades del ciclo'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* "Eventos del [día seleccionado]" Section (below calendar) */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📅</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Eventos del {formatDayTitle(selectedDate)}
              </h2>
              {selectedDayEvents.length > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
                  {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'evento' : 'eventos'}
                </span>
              )}
            </div>

            <Link
              href="/eventos"
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
            >
              <span>Ver todos los eventos del día</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Event Card (horizontal, large) */}
          {primarySelectedEvent ? (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all shadow-2xl flex flex-col lg:flex-row">
              {/* Left: Event image thumbnail with KEYNOTE INAUGURAL badge overlay */}
              <div className="relative w-full lg:w-96 h-56 sm:h-64 lg:h-auto bg-[#0a1f3d] shrink-0 overflow-hidden">
                <Image
                  src={primarySelectedEvent.image}
                  alt={primarySelectedEvent.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f1f3d]/60" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-[#1d6ef5] text-white text-[11px] font-black uppercase tracking-wider shadow-lg">
                    {primarySelectedEvent.badgeOverlay || 'KEYNOTE INAUGURAL'}
                  </span>
                </div>
              </div>

              {/* Right content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Bar: Category badge + bookmark icon + share icon */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                      {primarySelectedEvent.category || '🎓 Evento académico'}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Bookmark icon */}
                      <button
                        type="button"
                        onClick={() => setIsSaved(!isSaved)}
                        title={isSaved ? 'Quitar de guardados' : 'Guardar evento'}
                        aria-label="Guardar evento"
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-[#1d6ef5] border-[#1d6ef5] text-white shadow-md shadow-blue-500/30'
                            : 'bg-white/5 border-white/10 text-cyan-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>

                      {/* Share icon */}
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            navigator.clipboard.writeText(window.location.href);
                            alert('¡Enlace del evento copiado al portapapeles!');
                          }
                        }}
                        title="Compartir evento"
                        aria-label="Compartir evento"
                        className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Event Title (large, bold) */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight hover:text-cyan-300 transition-colors">
                    <Link href={`/eventos/${primarySelectedEvent.slug}`}>
                      {primarySelectedEvent.title}
                    </Link>
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="mt-2.5 text-sm text-[#94a3b8] leading-relaxed line-clamp-3">
                    {primarySelectedEvent.description}
                  </p>

                  {/* Metadata Row: Time, Location, Organizer */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/5">
                    {/* Time with clock icon */}
                    <div className="flex items-center gap-2.5 text-xs text-[#94a3b8]">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-semibold uppercase">Horario</span>
                        <span className="font-semibold text-white">{primarySelectedEvent.timeSpan || primarySelectedEvent.time}</span>
                      </div>
                    </div>

                    {/* Location with pin icon */}
                    <div className="flex items-center gap-2.5 text-xs text-[#94a3b8]">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-semibold uppercase">Ubicación</span>
                        <span className="font-semibold text-white truncate max-w-[170px] block">
                          {primarySelectedEvent.location}
                        </span>
                      </div>
                    </div>

                    {/* Organizer with people icon */}
                    <div className="flex items-center gap-2.5 text-xs text-[#94a3b8]">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-semibold uppercase">Organizador</span>
                        <span className="font-semibold text-white truncate max-w-[170px] block">
                          {primarySelectedEvent.organizer}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Green badge + Action buttons */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Green badge: ✅ Inscrito (Asistiré) with chevron-down */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowRegistrationStatus(!showRegistrationStatus)}
                      className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                    >
                      <span>✅ Inscrito (Asistiré)</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {showRegistrationStatus && (
                      <div className="absolute left-0 top-full mt-2 w-64 p-3 rounded-xl bg-[#0a1f3d] border border-white/15 shadow-2xl z-20 text-xs text-[#94a3b8] space-y-1.5">
                        <p className="font-bold text-white">Estado de confirmación</p>
                        <p>Tu entrada y código QR de acceso se enviaron a tu correo PUCP.</p>
                      </div>
                    )}
                  </div>

                  {/* Two buttons: Ver detalle completo → (ghost) | ✏ Modificar registro (blue) */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/eventos/${primarySelectedEvent.slug}`}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/15 transition-all text-center flex-1 sm:flex-none cursor-pointer"
                    >
                      Ver detalle completo →
                    </Link>

                    <button
                      type="button"
                      onClick={() => alert('Abriendo modal de modificación de registro...')}
                      className="px-5 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none cursor-pointer"
                    >
                      <span>✏</span>
                      <span>Modificar registro</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 text-center space-y-3">
              <span className="text-4xl block">🗓️</span>
              <h3 className="text-lg font-bold text-white">
                No hay eventos programados para el {formatDayTitle(selectedDate)}
              </h3>
              <p className="text-xs text-[#94a3b8] max-w-md mx-auto">
                Selecciona otro día con actividades marcadas en el calendario, como el 14 de noviembre para ver la AI & Data Night.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetToday}
                  className="px-4 py-2 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Ver evento del 14 de noviembre →
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
