import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#040e1e]/90 text-[#94a3b8] text-xs py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & mission */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐧</span>
            <span className="text-base font-bold text-white tracking-tight">Waddle</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#94a3b8]">
            Plataforma académica y comunitaria para estudiantes de Ingeniería Informática y Ciencias de la Computación de la Pontificia Universidad Católica del Perú.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Ciclo Académico 2026-1
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            Plataforma
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Inicio / Dashboard
              </Link>
            </li>
            <li>
              <Link href="/eventos" className="hover:text-cyan-400 transition-colors">
                Explorar eventos
              </Link>
            </li>
            <li>
              <Link href="/guardados" className="hover:text-cyan-400 transition-colors">
                Eventos guardados
              </Link>
            </li>
            <li>
              <Link href="/agrupaciones" className="hover:text-cyan-400 transition-colors">
                Agrupaciones estudiantiles
              </Link>
            </li>
            <li>
              <Link href="/calendario" className="hover:text-cyan-400 transition-colors">
                Calendario académico
              </Link>
            </li>
          </ul>
        </div>

        {/* Community & Categories */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            Comunidades PUCP
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/agrupaciones?cat=Tecnológica" className="hover:text-cyan-400 transition-colors">
                Capítulos ACM & DSC
              </Link>
            </li>
            <li>
              <Link href="/agrupaciones?cat=Estudiantil" className="hover:text-cyan-400 transition-colors">
                Asociación de Informática (AAI)
              </Link>
            </li>
            <li>
              <Link href="/agrupaciones?cat=Tecnológica" className="hover:text-cyan-400 transition-colors">
                Women in Tech PUCP
              </Link>
            </li>
            <li>
              <Link href="/soporte" className="hover:text-cyan-400 transition-colors">
                Registrar nueva agrupación
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            Soporte & Contacto
          </h4>
          <p className="text-[11px] mb-2 text-[#94a3b8]">
            ¿Tienes dudas técnicas o deseas vincular un evento?
          </p>
          <Link
            href="/soporte"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
          >
            <span>Centro de ayuda Waddle</span>
            <span>→</span>
          </Link>
          <p className="mt-3 text-[10px] text-slate-500">
            Facultad de Ciencias e Ingeniería · Pabellón V · San Miguel, Lima
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© 2026 Waddle PUCP. Desarrollado con dedicación para la comunidad de Informática.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Términos de servicio</span>
          <span>·</span>
          <span>Privacidad</span>
          <span>·</span>
          <span>PUCP Virtual</span>
        </div>
      </div>
    </footer>
  );
}
