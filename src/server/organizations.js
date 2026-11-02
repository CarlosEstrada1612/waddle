import "server-only";
import { createPublicClient } from "@/lib/supabase/public";
import { mockOrganizations, mockEvents } from "@/lib/mockData";

const fields = "id::text,nombre,descripcion,logo,portada";

// Returns true when Supabase env vars are present
function hasSupabase() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

// ── ORGANIZATIONS LIST ────────────────────────────────────────────────────────

export async function listOrganizations(page = 1, search = "", order = "az") {
  if (!hasSupabase()) {
    // Fallback: mock data
    let orgs = [...mockOrganizations];
    if (search) {
      const q = search.toLowerCase();
      orgs = orgs.filter((o) => o.name.toLowerCase().includes(q));
    }
    orgs.sort((a, b) => a.name.localeCompare(b.name, "es") * (order === "za" ? -1 : 1));
    const start = (page - 1) * 12;
    return { organizations: orgs.slice(start, start + 12), count: orgs.length };
  }

  const start = (page - 1) * 12;
  let query = createPublicClient()
    .from("agrupaciones_publicas")
    .select(fields, { count: "exact" });

  if (search)
    query = query.ilike("nombre", `%${search.replace(/[\\%_]/g, "\\$&")}%`);

  const { data, error, count } = await query
    .order("nombre", { ascending: order !== "za" })
    .order("id")
    .range(start, start + 11);

  if (error) throw new Error("No se pudieron consultar las agrupaciones.");
  return { organizations: data, count: count ?? 0 };
}

// ── SINGLE ORGANIZATION ───────────────────────────────────────────────────────

export async function getOrganization(id) {
  if (!hasSupabase()) {
    // Fallback: mock data
    const org = mockOrganizations.find((o) => o.id === id);
    if (!org) return null;
    const events = mockEvents.filter((e) => e.organizerIds?.includes(id));
    return {
      ...org,
      nombre: org.fullName || org.name,
      descripcion: org.description,
      logo: null,
      portada: null,
      members: [],
      events,
    };
  }

  if (!/^[1-9]\d{0,18}$/.test(id) || BigInt(id) > 9223372036854775807n)
    return null;

  const client = createPublicClient();
  const { data, error } = await client
    .from("agrupaciones_publicas")
    .select(fields)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("No se pudo consultar la agrupación.");
  if (!data) return null;

  const members = await client
    .from("integrantes_publicos")
    .select("nombre,rol,enlace_publico")
    .eq("agrupacion_id", id)
    .order("nombre");

  if (members.error) throw new Error("No se pudieron consultar los integrantes.");
  return { ...data, members: members.data };
}
