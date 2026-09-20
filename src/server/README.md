# Lógica de servidor

Los archivos actuales son módulos vacíos, no implementaciones de seguridad.
Aquí se comprobarán identidad, permisos y datos antes de consultar o modificar
Supabase. Marcar los módulos implementados con `import "server-only"` y mantener
las Server Actions en archivos con `"use server"` cuando corresponda. El nombre
de la carpeta por sí solo no impide importar código desde el navegador.
