import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrganization } from "@/server/organizations";
import OrganizationImage from "@/components/organizations/organization-image";
import MemberLink from "@/components/organizations/member-link";
import Icon from "@/components/organizations/icon";

export const metadata = { title: "Perfil de agrupación" };
export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { id } = await params;
  const org = await getOrganization(id);
  if (!org) notFound();
  return <main className="organization-main">
    <Link href="/agrupaciones" className="back-link"><Icon name="back" /> Volver a agrupaciones</Link>
    <article>
      <header className="profile-hero"><div className="profile-cover"><OrganizationImage src={org.portada} name={org.nombre} cover /></div><div className="profile-identity"><OrganizationImage src={org.logo} name={org.nombre} /><div><span className="community-eyebrow">COMUNIDAD PUCP</span><h1>{org.nombre}</h1><p>Agrupación estudiantil de Informática</p><span className="profile-team-count"><Icon name="users" /> {org.members.length} {org.members.length === 1 ? "integrante publicado" : "integrantes publicados"}</span></div></div></header>
      <nav className="profile-navigation" aria-label="Secciones del perfil"><a href="#sobre-nosotros">Sobre nosotros</a><a href="#equipo">Equipo &amp; integrantes <span>{org.members.length}</span></a></nav>
      <div className="profile-panels"><section className="community-panel" id="sobre-nosotros"><h2><Icon name="info" /> Descripción</h2><p className="profile-description">{org.descripcion || "Esta agrupación todavía no ha añadido su descripción."}</p></section><aside className="community-panel profile-community"><span className="community-emblem"><Icon name="users" /></span><h2>Parte de nuestra comunidad</h2><p>Personas que comparten ideas, aprenden juntas y crean nuevas oportunidades.</p><Link href="/agrupaciones">Explorar agrupaciones <Icon name="arrow" /></Link></aside></div>
      <section id="equipo" className="profile-team"><h2 className="directory-section-heading"><Icon name="users" /> Equipo &amp; integrantes</h2>{org.members.length ? <ul className="member-grid">{org.members.map((member,index) => <li key={`${member.nombre}-${index}`} className="member-card"><div className="member-avatar" aria-hidden="true">{member.nombre?.trim().slice(0,2).toUpperCase() || "IN"}</div><div><span className="organization-badge">{member.rol === "jefe" ? "Jefe de agrupación" : "Promotor"}</span><h3>{member.nombre || "Integrante"}</h3><MemberLink url={member.enlace_publico} name={member.nombre || "integrante"} /></div></li>)}</ul> : <div className="community-panel team-empty"><Icon name="users" /><p>El equipo de esta agrupación aparecerá aquí cuando esté disponible.</p></div>}</section>
    </article>
  </main>;
}
