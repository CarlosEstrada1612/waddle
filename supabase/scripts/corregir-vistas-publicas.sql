-- Ejecutar completo en SQL Editor después del script inicial. No borra perfiles.
-- Se puede repetir. Los triggers mantienen una proyección de datos públicos.
begin;
lock table public."Usuario", public.membresias, public.usuario_seguridad in share row exclusive mode;

create table if not exists public.directorio_integrantes (
  membresia_id bigint primary key references public.membresias(id) on delete cascade,
  agrupacion_id bigint not null references public."Agrupacion"(id) on delete cascade,
  nombre text,
  rol text not null check (rol in ('jefe', 'promotor')),
  enlace_publico text
);
create index if not exists directorio_integrantes_agrupacion on public.directorio_integrantes(agrupacion_id);
alter table public.directorio_integrantes enable row level security;
revoke all on public.directorio_integrantes from public, anon, authenticated;
grant select on public.directorio_integrantes to anon, authenticated;
grant all on public.directorio_integrantes to service_role;
drop policy if exists directorio_lectura_publica on public.directorio_integrantes;
create policy directorio_lectura_publica on public.directorio_integrantes
for select to anon, authenticated using (true);

-- Solo los triggers internos pueden invocar esta función privilegiada.
-- Publica únicamente campos permitidos y retira miembros inactivos/suspendidos.
create or replace function waddle_private.sincronizar_directorio(p_usuario bigint)
returns void language plpgsql security definer set search_path = '' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(p_usuario);
  delete from public.directorio_integrantes d
  using public.membresias m
  where d.membresia_id = m.id and m.usuario_id = p_usuario;

  insert into public.directorio_integrantes
    (membresia_id, agrupacion_id, nombre, rol, enlace_publico)
  select m.id, m.agrupacion_id, u.nombre, m.rol, m.enlace_publico
  from public.membresias m
  join public."Usuario" u on u.id_usuario = m.usuario_id
  join public.usuario_seguridad s on s.usuario_id = m.usuario_id
  where m.usuario_id = p_usuario and m.activo
    and m.rol in ('jefe', 'promotor') and not s.suspendido
  on conflict (membresia_id) do update set
    agrupacion_id = excluded.agrupacion_id, nombre = excluded.nombre,
    rol = excluded.rol, enlace_publico = excluded.enlace_publico;
end;
$$;

create or replace function waddle_private.actualizar_directorio()
returns trigger language plpgsql security definer set search_path = '' as $$
declare anterior bigint; siguiente bigint;
begin
  if tg_op <> 'INSERT' then
    anterior := case when tg_table_name = 'Usuario' then
      (to_jsonb(old)->>'id_usuario')::bigint else (to_jsonb(old)->>'usuario_id')::bigint end;
    perform waddle_private.sincronizar_directorio(anterior);
  end if;
  if tg_op <> 'DELETE' then
    siguiente := case when tg_table_name = 'Usuario' then
      (to_jsonb(new)->>'id_usuario')::bigint else (to_jsonb(new)->>'usuario_id')::bigint end;
    if siguiente is distinct from anterior then
      perform waddle_private.sincronizar_directorio(siguiente);
    end if;
  end if;
  return null;
end;
$$;
revoke all on function waddle_private.sincronizar_directorio(bigint) from public, anon, authenticated;
revoke all on function waddle_private.actualizar_directorio() from public, anon, authenticated;

drop trigger if exists directorio_membresias on public.membresias;
create trigger directorio_membresias after insert or update or delete on public.membresias
for each row execute function waddle_private.actualizar_directorio();
drop trigger if exists directorio_usuario on public."Usuario";
create trigger directorio_usuario after update on public."Usuario"
for each row execute function waddle_private.actualizar_directorio();
drop trigger if exists directorio_seguridad on public.usuario_seguridad;
create trigger directorio_seguridad after insert or update or delete on public.usuario_seguridad
for each row execute function waddle_private.actualizar_directorio();

-- Sincronizar registros que ya existían.
select waddle_private.sincronizar_directorio(id_usuario) from public."Usuario";

-- La vista de agrupaciones solo necesita acceso a estas columnas.
grant select (id, nombre, descripcion, logo, portada)
on public."Agrupacion" to anon, authenticated;
drop policy if exists agrupacion_lectura_publica on public."Agrupacion";
create policy agrupacion_lectura_publica on public."Agrupacion"
for select to anon, authenticated using (true);
alter view public.agrupaciones_publicas set (security_invoker = true);

-- Conservamos nombres y tipos de columnas de la vista anterior.
create or replace view public.integrantes_publicos
with (security_invoker = true, security_barrier = true) as
select agrupacion_id, nombre::varchar as nombre, rol, enlace_publico
from public.directorio_integrantes;
grant select on public.agrupaciones_publicas, public.integrantes_publicos to anon, authenticated;

-- Validación de privilegios efectivos usando el rol de un visitante.
set local role anon;
select id, nombre from public.agrupaciones_publicas limit 1;
select nombre, rol from public.integrantes_publicos limit 1;
reset role;
commit;

select c.relname, c.reloptions from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relname in ('agrupaciones_publicas','integrantes_publicos');

