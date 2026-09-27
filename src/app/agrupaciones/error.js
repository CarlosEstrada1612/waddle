"use client";
import Link from "next/link";
export default function Error({ reset }) {
  return <main className="community-state"><h1>No pudimos cargar las agrupaciones</h1><p>Inténtalo nuevamente en unos momentos.</p><button onClick={reset} className="blue-button">Volver a intentar</button><Link href="/agrupaciones" className="ml-5 underline">Volver al directorio</Link></main>;
}
