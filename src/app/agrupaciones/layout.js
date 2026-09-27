import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/organizations/icon";
import "./organizations.css";

const links = [
  ["home", "Inicio", "/"],
  ["compass", "Explorar eventos", "/eventos"],
  ["bookmark", "Eventos guardados", "/guardados"],
  ["users", "Agrupaciones", "/agrupaciones"],
  ["calendar", "Calendario", "/calendario"],
];

export default function OrganizationsLayout({ children }) {
  return <div className="community-shell">
    <aside className="community-sidebar">
      <Link href="/" className="community-brand" aria-label="Waddle, inicio">
        <span className="community-logo"><Image src="/images/waddle-logo.png" alt="" width={58} height={58} priority /></span>
        <span><strong>Waddle</strong><small>COMUNIDAD PUCP</small></span>
      </Link>
      <nav className="community-nav" aria-label="Navegación principal">
        {links.map(([icon, label, href]) => <Link key={href} href={href} className={href === "/agrupaciones" ? "is-active" : ""} aria-current={href === "/agrupaciones" ? "page" : undefined}><Icon name={icon} /><span>{label}</span></Link>)}
      </nav>
      <div className="sidebar-circuits" aria-hidden="true" />
      <Link href="/login" className="community-account"><span className="account-icon"><Icon name="user" /></span><span><strong>Tu comunidad te espera</strong><small>Iniciar sesión</small></span><Icon name="arrow" /></Link>
      <div className="sidebar-wave" aria-hidden="true" />
    </aside>
    <div className="community-content">
      <header className="community-topbar"><span>COMUNIDAD DE INFORMÁTICA</span><Link href="/login" className="community-login"><Icon name="user" /> Iniciar sesión</Link></header>
      {children}
      <footer className="community-footer">Waddle <span>Un espacio para conectar, aprender y crear.</span></footer>
    </div>
  </div>;
}
