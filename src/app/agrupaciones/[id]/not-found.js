import Link from "next/link";
export default function NotFound() {
  return <main className="community-state"><h1>Agrupación no encontrada</h1><p>El enlace no corresponde a una agrupación disponible.</p><Link href="/agrupaciones" className="blue-button">Explorar agrupaciones</Link></main>;
}
