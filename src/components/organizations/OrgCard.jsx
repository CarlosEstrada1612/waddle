'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrgCard({ organization }) {
  const [following, setFollowing] = useState(organization.following ?? false);

  const toggleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowing(!following);
  };

  return (
    <div className="group glass-card hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      <div>
        {/* Cover banner */}
        <div
          className="h-24 w-full relative p-3 flex justify-end items-start"
          style={{
            background: `linear-gradient(135deg, ${organization.color}33 0%, #071428 100%)`,
          }}
        >
          {/* Subtle tech grid/circuit pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

          {/* Follow / Bookmark button on top right */}
          <button
            type="button"
            onClick={toggleFollow}
            className={`relative z-10 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              following
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-black/50 text-white/80 hover:text-white border border-white/10'
            }`}
          >
            {following ? 'Siguiendo' : '+ Seguir'}
          </button>
        </div>

        {/* Profile Circle overlapping banner */}
        <div className="px-5 relative -mt-8 flex items-end justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-xl border-2 border-[#0a1f3d]"
            style={{ backgroundColor: organization.color }}
          >
            {organization.initials || organization.name.slice(0, 3)}
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-medium">
            {organization.category}
          </span>
        </div>

        {/* Info */}
        <div className="px-5 pt-3 pb-2">
          <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
            {organization.name}
          </h3>
          <p className="text-[11px] text-[#94a3b8] mb-2">
            {organization.members} miembros activos
          </p>
          <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
            {organization.description}
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="px-5 pb-4 pt-2">
        <Link
          href={`/agrupaciones/${organization.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-white/5 hover:bg-blue-600/20 text-cyan-300 hover:text-white border border-white/10 hover:border-blue-500/30 transition-all"
        >
          <span>Ver perfil y eventos</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
