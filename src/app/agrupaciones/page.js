import Link from "next/link";
import { listOrganizations } from "@/server/organizations";
import OrganizationImage from "@/components/organizations/organization-image";
import Icon from "@/components/organizations/icon";

export const metadata = { title: "Agrupaciones" };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const page = /^\d{1,6}$/.test(params.pagina ?? "") ? Math.max(1, Number(params.pagina)) : 1;
  const search = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const order = params.orden === "za" ? "za" : "az";
  const { organizations, count } = await listOrganizations(page, search, order);
  const pageUrl = (number) => `?${new URLSearchParams({ q: search, orden: order, pagina: String(number) })}`;
  return <main className="directory-main">
    <section className="directory-heading">
      <div><span className="community-eyebrow">DESCUBRE TU COMUNIDAD</span><h1>Agrupaciones</h1><p>Conoce las agrupaciones de Informática de la PUCP<br className="desktop-break" /> y forma parte de la comunidad.</p></div>
      <div className="organization-count"><Icon name="users" /><div><strong>{count}</strong><span>{search ? "Resultados" : "Agrupaciones"}</span></div></div>
    </section>
    <form action="/agrupaciones" className="directory-search">
      <div className="search-field"><Icon name="search" /><label className="sr-only" htmlFor="organization-search">Buscar agrupaciones por nombre</label><input id="organization-search" name="q" defaultValue={search} placeholder="Buscar agrupaciones por nombre…" maxLength={100} /><button className="blue-button" type="submit">Buscar <Icon name="arrow" /></button></div>
      <div className="directory-controls"><Link href="/agrupaciones" className={`filter-chip ${!search ? "selected" : ""}`}><Icon name="grid" /> Todas</Link>{search && <span className="search-summary">Resultados para “{search}”</span>}<label className="directory-sort">Ordenar por: <select name="orden" defaultValue={order}><option value="az">Nombre: A–Z</option><option value="za">Nombre: Z–A</option></select></label></div>
    </form>
    <div className="directory-section-heading"><Icon name="grid" /><h2>{search ? "Resultados de búsqueda" : "Todas las agrupaciones"}</h2></div>
    {organizations.length ? <div className="organization-grid">
      {organizations.map((org) => <article className="organization-card" key={org.id}>
        <div className="card-cover"><OrganizationImage src={org.portada} name={org.nombre} cover /></div>
        <div className="card-body"><OrganizationImage src={org.logo} name={org.nombre} /><h3>{org.nombre}</h3><span className="organization-badge">Agrupación estudiantil</span><p>{org.descripcion || "Conoce a la agrupación y descubre quiénes forman parte de su equipo."}</p><Link className="card-profile-link" href={`/agrupaciones/${org.id}`}>Ver perfil <Icon name="arrow" /></Link></div>
      </article>)}
    </div> : <section className="community-empty"><span className="empty-icon"><Icon name={search ? "search" : "users"} /></span><h2>{search ? "No encontramos agrupaciones" : page > 1 ? "No hay más agrupaciones" : "Tu próxima comunidad está por llegar"}</h2><p>{search ? "Prueba con otro nombre o explora todas las agrupaciones." : "Aquí encontrarás sus perfiles, actividades y a las personas que las hacen posibles."}</p>{(search || page > 1) && <Link href="/agrupaciones" className="blue-button">Ver todas las agrupaciones <Icon name="arrow" /></Link>}</section>}
    {(page > 1 || page * 12 < count) && <nav aria-label="Paginación" className="directory-pagination">{page > 1 ? <Link href={pageUrl(page - 1)}>← Anterior</Link> : <span />}<span>Página {page}</span>{page * 12 < count ? <Link href={pageUrl(page + 1)}>Siguiente →</Link> : <span />}</nav>}
  </main>;
}
