# Arquitectura de Waddle

## Estructura

```text
public/images/          Recursos estáticos
src/app/                Páginas y endpoints de Next.js
src/components/ui/      Elementos visuales reutilizables
src/components/layout/  Encabezado y navegación
src/components/auth/    Interfaz del acceso y onboarding
src/components/events/  Interfaz de eventos
src/components/organizations/ Interfaz de agrupaciones
src/server/             Operaciones y permisos de servidor
src/lib/supabase/       Clientes de navegador y servidor
src/lib/validations/    Reglas de validación compartidas
src/lib/utils.js        Utilidades compartidas
src/proxy.js            Punto de integración de renovación de sesión
supabase/migrations/    Esquema y políticas RLS versionados
docs/                   Arquitectura y requisitos
```

## Estado actual

La portada se conserva. Las nuevas páginas muestran un mensaje provisional.
Los módulos de servidor y clientes Supabase no tienen implementación. El callback
responde 501 y el Proxy solo deja pasar solicitudes: no hay autenticación ni
protección de rutas todavía. No ingresar datos reales en pantallas de gestión
hasta implementar los permisos. Las carpetas vacías usan `.gitkeep` para Git.

## Responsabilidades

Las páginas componen componentes visuales. Los componentes llaman operaciones
servidor para modificar datos. En servidor se valida la entrada y se comprueban
permisos; las políticas RLS también restringen el acceso a la base de datos.

Ejemplo futuro: `app/gestion/eventos/nuevo/page.js` muestra
`components/events/event-form.js`; una acción de servidor valida y guarda el
nuevo evento mediante el cliente Supabase del servidor.

Mantener JavaScript, nombres de archivo en kebab-case, componentes en PascalCase
 e imports con el alias `@/`. Las páginas son componentes de servidor por defecto;
usar `"use client"` solo cuando sea necesario. Una carpeta llamada `server` no
crea una barrera de seguridad: marcar sus módulos al implementarlos y comprobar
la autorización en cada operación.

## Configuración

Copiar `.env.example` a `.env.local` al integrar Supabase. La URL y clave publicable
pueden exponerse al navegador; los secretos no. El Client Secret de Google se
configura en el proveedor de Supabase. No guardar credenciales en Git.

## Siguiente paso

Instalar los clientes Supabase, implementar login y callback, renovar sesiones,
crear perfiles y membresías con RLS y conectar términos y onboarding.

## Verificación

Ejecutar `npm run lint` y `npm run build`. Las fuentes de Google requieren red
al compilar. Agregar pruebas de permisos y flujos cuando se implementen.
