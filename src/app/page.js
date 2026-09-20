export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <p className="text-sm font-semibold tracking-widest uppercase">Waddle</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Tu comunidad, en un solo lugar.
      </h1>
      <p className="max-w-xl text-lg leading-8">
        Descubre los eventos, talleres y charlas de las agrupaciones de
        Informática de tu universidad.
      </p>
      <p className="text-sm opacity-70">Próximamente.</p>
    </main>
  );
}
