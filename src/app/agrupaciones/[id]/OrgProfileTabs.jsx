'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatusBadge from '@/components/layout/StatusBadge';
import EventCard from '@/components/events/EventCard';
import { safeHttpsUrl } from '@/components/organizations/organization-image';

export default function OrgProfileTabs({ org, upcomingEvents = [], pastEvents = [] }) {
  const [activeTab, setActiveTab] = useState('sobre-nosotros');

  const tabs = [
    { id: 'sobre-nosotros', label: 'Sobre nosotros' },
    {
      id: 'proximos-eventos',
      label: 'Próximos eventos',
      count: upcomingEvents.length,
    },
    { id: 'historial', label: 'Historial de actividades' },
    {
      id: 'equipo',
      label: 'Equipo & Integrantes',
      count: org.members && org.members.length > 0 ? org.members.length : undefined,
    },
  ];

  return (
    <div className="w-full">
      {/* B. Tabs Navigation */}
      <div className="border-b border-white/10 mb-8">
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 sm:px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'border-[#1d6ef5] text-white'
                    : 'border-transparent text-[#94a3b8] hover:text-white hover:border-white/20'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive
                        ? 'bg-[#1d6ef5] text-white shadow-sm'
                        : 'bg-white/10 text-cyan-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab 1: Sobre nosotros (default) */}
      {activeTab === 'sobre-nosotros' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Descripción */}
          <div className="lg:col-span-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
                <span className="text-xl">👥</span>
                <h3 className="text-lg font-bold text-white tracking-tight">Descripción</h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                {org.id === 'dsc' ? (
                  <>
                    <p>
                      El Google Developer Student Club (DSC) PUCP es una comunidad universitaria
                      impulsada por Google y liderada por estudiantes, que busca fomentar el aprendizaje,
                      la innovación y el desarrollo de soluciones tecnológicas con impacto real.
                    </p>
                    <p>
                      Organizamos talleres, charlas, hackathons y proyectos colaborativos enfocados en
                      desarrollo web, cloud, inteligencia artificial y más, creando un espacio
                      inclusivo para que todos los estudiantes puedan aprender, compartir y construir
                      tecnología juntos.
                    </p>
                    <p className="font-semibold text-cyan-400">
                      ¡Construyamos el futuro, juntos! 💙
                    </p>
                  </>
                ) : (
                  <>
                    <p>{org.description}</p>
                    <p>
                      Nuestra agrupación fomenta la formación integral de los estudiantes de Ciencias e
                      Ingeniería, conectando la teoría académica con retos prácticos de la industria
                      tecnológica y promoviendo la colaboración multidisciplinaria.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Quick highlight tags */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider block mb-3">
                Pilares comunitarios
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-medium">
                  🤖 Inteligencia Artificial & ML
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-medium">
                  ☁️ Cloud Computing & GCP
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-medium">
                  💻 Desarrollo Web Moderno
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-medium">
                  🚀 Proyectos Open Source
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Contacto */}
          <div className="lg:col-span-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
                <span className="text-xl">✉️</span>
                <h3 className="text-lg font-bold text-white tracking-tight">Contacto</h3>
              </div>

              {/* Email */}
              <div className="mb-6 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block mb-1">
                  Correo oficial
                </span>
                <a
                  href="mailto:dsc-chapter@pucp.edu.pe"
                  className="text-sm font-semibold text-[#38bdf8] hover:underline flex items-center gap-2 break-all"
                >
                  <svg className="w-4 h-4 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>dsc-chapter@pucp.edu.pe</span>
                </a>
              </div>

              {/* Social networks */}
              <div>
                <h4 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">
                  Redes sociales
                </h4>
                <div className="space-y-2.5">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/dscpucp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                        🟣
                      </span>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors font-medium">Instagram:</span>
                      <span className="font-semibold text-white">@dscpucp</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        🔵
                      </span>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors font-medium">LinkedIn:</span>
                      <span className="font-semibold text-white">DSC PUCP</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* Discord */}
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        🟣
                      </span>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors font-medium">Discord:</span>
                      <span className="font-semibold text-white">Únete a nuestro servidor</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                        🔴
                      </span>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors font-medium">YouTube:</span>
                      <span className="font-semibold text-white">DSC PUCP</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* Web */}
                  <a
                    href="https://dscpucp.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        🌐
                      </span>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors font-medium">Web:</span>
                      <span className="font-semibold text-white">dscpucp.dev</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-[#94a3b8] text-center">
              Revisión y soporte: <span className="text-white">Pabellón V · Aula 201</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Próximos eventos */}
      {activeTab === 'proximos-eventos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Agenda de Próximos Eventos
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Actividades técnicas oficiales programadas para el ciclo 2026-1.
              </p>
            </div>
            <Link
              href="/eventos"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Explorar todos los eventos del campus →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Historial de actividades */}
      {activeTab === 'historial' && (
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Historial de Actividades
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              Eventos y talleres concluidos en ciclos anteriores organizados por {org.name}.
            </p>
          </div>

          {pastEvents.length > 0 ? (
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={event.status} />
                      <span className="text-xs text-[#94a3b8]">
                        📅 {event.date} · {event.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                        {event.modality}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                      <Link href={`/eventos/${event.slug}`}>{event.title}</Link>
                    </h4>

                    <p className="text-xs text-[#94a3b8] line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[#94a3b8] pt-1">
                      <span>📍 {event.location}</span>
                      <span>👥 {event.attendees} participantes registrados</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/eventos/${event.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10 transition-colors"
                    >
                      <span>Ver detalles</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
              <span className="text-3xl block mb-2">📜</span>
              <p className="text-sm font-semibold text-white">No hay actividades pasadas registradas</p>
              <p className="text-xs text-[#94a3b8] mt-1">
                Los eventos culminados se archivarán automáticamente en esta sección.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Equipo & Integrantes */}
      {activeTab === 'equipo' && (
        <div className="space-y-6">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Equipo & Integrantes Directivos
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              Estudiantes a cargo de la gestión, mentoría técnica y organización durante 2026.
            </p>
          </div>

          {org.members && org.members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {org.members.map((member, index) => (
                <div
                  key={`${member.nombre}-${index}`}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1d6ef5] to-[#38bdf8] flex items-center justify-center font-bold text-white text-base shadow-md shrink-0">
                        {member.nombre?.trim().slice(0, 2).toUpperCase() || 'IN'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-white truncate">
                          {member.nombre || 'Integrante'}
                        </h4>
                        <span
                          className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            member.rol === 'jefe'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-blue-500/20 text-cyan-300 border-blue-500/30'
                          }`}
                        >
                          {member.rol === 'jefe' ? 'Jefe de agrupación' : 'Promotor'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      Integrante publicado por la agrupación.
                    </p>
                  </div>

                  {safeHttpsUrl(member.enlace_publico) && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-semibold">
                        Perfil externo
                      </span>
                      <a
                        href={safeHttpsUrl(member.enlace_publico)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        <span>Ver perfil</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 p-6 text-sm text-slate-400">
              El equipo de esta agrupación aparecerá aquí cuando esté disponible.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
