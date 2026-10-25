'use client';

import { useState, useMemo } from 'react';
import { mockOrganizations } from '@/lib/mockData';
import OrgCard from '@/components/organizations/OrgCard';
import Footer from '@/components/layout/Footer';

export default function AgrupacionesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('members');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    'Todas',
    'Tecnológica',
    'Estudiantil',
    'Académica',
    'Social',
    'Cultural',
  ];

  const filteredOrgs = useMemo(() => {
    return mockOrganizations
      .filter((org) => {
        if (selectedCategory !== 'Todas') {
          if (
            org.category.toLowerCase() !== selectedCategory.toLowerCase() &&
            !org.category.toLowerCase().includes(selectedCategory.toLowerCase())
          ) {
            return false;
          }
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = org.name.toLowerCase().includes(q);
          const matchFull = (org.fullName || '').toLowerCase().includes(q);
          const matchDesc = (org.description || '').toLowerCase().includes(q);
          if (!matchName && !matchFull && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'members') return b.members - a.members;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [search, selectedCategory, sortBy]);

  const pageSize = 8;
  const totalPages = Math.ceil(filteredOrgs.length / pageSize) || 1;
  const paginatedOrgs = filteredOrgs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header section */}
      <section className="relative overflow-hidden pt-8 pb-10 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              PERIODO ACADÉMICO 2026-1
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Agrupaciones Estudiantiles
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Conoce las agrupaciones de la Facultad de Ciencias de la Computación e Informática y forma parte activa de la comunidad.
            </p>
          </div>

          <div className="glass px-5 py-3 rounded-xl border border-white/10 text-center shrink-0">
            <span className="block text-2xl font-extrabold text-cyan-400">
              {mockOrganizations.length}
            </span>
            <span className="text-xs text-[#94a3b8]">Agrupaciones registradas</span>
          </div>
        </div>

        {/* Search input + Category filter pills */}
        <div className="max-w-7xl mx-auto mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar agrupaciones... (ej. DSC, IA, desarrollo web, ciberseguridad)"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder-[#94a3b8] focus:outline-none focus:border-cyan-400"
              />
              <svg
                className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1d6ef5] text-white shadow-md shadow-blue-500/25'
                      : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <span>Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0a1f3d] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="members">Más miembros</option>
                <option value="name">Alfabético (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Org Cards (4 columns) */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-1">
        {paginatedOrgs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedOrgs.map((org) => (
              <OrgCard key={org.id} organization={org} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <span className="text-4xl block mb-3">👥</span>
            <h3 className="text-lg font-bold text-white">No se encontraron agrupaciones</h3>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-sm mx-auto">
              Intenta buscar con otros términos o selecciona otra categoría.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
            <p>
              Página <span className="text-white font-semibold">{currentPage}</span> de{' '}
              <span className="text-white font-semibold">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40"
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === n
                      ? 'bg-[#1d6ef5] text-white shadow-md'
                      : 'glass text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white disabled:opacity-40"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
