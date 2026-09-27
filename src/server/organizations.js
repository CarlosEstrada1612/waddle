import "server-only";
import { createPublicClient } from "@/lib/supabase/public";

const fields = "id::text,nombre,descripcion,logo,portada";

export async function listOrganizations(page = 1, search = "", order = "az") {
  const start = (page - 1) * 12;
  let query = createPublicClient()
    .from("agrupaciones_publicas").select(fields, { count: "exact" });
  if (search) query = query.ilike("nombre", `%${search.replace(/[\\%_]/g, "\\$&")}%`);
  const { data, error, count } = await query
    .order("nombre", { ascending: order !== "za" }).order("id").range(start, start + 11);
  if (error) throw new Error("No se pudieron consultar las agrupaciones.");
  return { organizations: data, count: count ?? 0 };
}

export async function getOrganization(id) {
  if (!/^[1-9]\d{0,18}$/.test(id) || BigInt(id) > 9223372036854775807n) return null;
  const client = createPublicClient();
  const { data, error } = await client.from("agrupaciones_publicas")
    .select(fields).eq("id", id).maybeSingle();
  if (error) throw new Error("No se pudo consultar la agrupación.");
  if (!data) return null;
  const members = await client.from("integrantes_publicos")
    .select("nombre,rol,enlace_publico").eq("agrupacion_id", id).order("nombre");
  if (members.error) throw new Error("No se pudieron consultar los integrantes.");
  return { ...data, members: members.data };
}
