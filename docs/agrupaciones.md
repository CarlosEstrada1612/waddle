# Agrupaciones públicas (RF04)

Implementado: directorio paginado, perfil con logo/portada/descripción e integrantes,
estados vacío/error/carga y 404. Las consultas se ejecutan en servidor con la clave
publicable, sin cookies ni permisos administrativos. No se muestran datos ficticios.

## Configuración

En `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` y
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Usar `npm install`, `npm run dev`.
Abrir `/agrupaciones`.

## Corrección de las vistas

Ejecutar completo `supabase/scripts/corregir-vistas-publicas.sql` en SQL Editor,
después del script inicial compartido en el chat. Conserva las tablas existentes.
Las vistas pasan a security_invoker. Agrupacion concede solo lectura de campos
públicos. Los datos privados de Usuario, membresias y usuario_seguridad mantienen
sus políticas: no se les añade acceso anónimo.

`directorio_integrantes` es una proyección pública mantenida por triggers privados.
No editarla desde la aplicación; los cambios se realizan en las tablas de origen.
La sincronización publica jefes/promotores activos no suspendidos, actualiza nombres
y enlaces y retira integrantes al suspenderlos o removerlos. Las funciones de
sincronización no son ejecutables por anon/authenticated. No exponer waddle_private
en la Data API. No usar TRUNCATE para gestionar las tablas de origen.

Validación realizada en PostgreSQL embebido (PGlite) con un esquema de prueba:
script repetible; acceso anon y authenticated; denegación de datos privados y
escrituras del directorio; sincronización de nombre, suspensión, activación y borrado.
Falta ejecutar la corrección y verificar los asesores en el proyecto remoto.
Las consultas remotas de solo lectura confirmaron vistas accesibles, sin registros.

## Dependencias pendientes

- Historial de eventos: falta la tabla y contrato del módulo de eventos.
- Seguir/dejar de seguir: siguiente entrega, requiere sesión y Usuario.auth_user_id.
- Gestión y moderación: fuera del alcance de esta primera pantalla.
- Autenticación/SSR: los clientes client.js/server.js siguen reservados al módulo de
  autenticación; public.js es exclusivamente para las consultas públicas de RF04.

## Diseño de referencia

Adaptación de las pantallas 5 y 6 de Figma (Corrección con IA): azul marino,
navegación lateral, acentos cian, cuadrícula de cuatro columnas y perfil con
portada y paneles. El logo original está en public/images/waddle-logo.png;
su versión clara se obtiene por CSS sin modificar el archivo original.
Búsqueda por nombre y orden A–Z/Z–A se aplican al enviar el formulario.
La navegación se adapta a una franja desplazable en móvil.
No se simulan categorías, seguidores, contacto, eventos o funciones de seguimiento
que todavía no están conectadas. Se verificó escritorio a 1440 px y móvil a 390 px,
incluyendo tarjetas y perfil mediante fixtures temporales retirados tras la revisión.
