# 🐧 Waddle

**Todos los eventos de Informática, en un solo lugar.**

Waddle es una plataforma web que reúne los eventos organizados por las distintas agrupaciones estudiantiles de Informática de nuestra universidad.

La idea nace de un problema simple: muchos eventos, charlas, talleres y actividades se publican en diferentes canales y redes sociales, haciendo difícil enterarse de todo lo que está pasando.

Waddle busca centralizar esa información en una interfaz sencilla y amigable, permitiendo descubrir eventos y conocer mejor a las agrupaciones de la comunidad.

## ✨ Funcionalidades

Waddle se encuentra actualmente en desarrollo.

- 📅 Explorar próximos eventos.
- 🔎 Buscar y filtrar eventos.
- 👥 Explorar agrupaciones estudiantiles.
- 📌 Consultar información detallada de cada evento.
- 🏠 Descubrir eventos destacados.
- 📱 Interfaz adaptable a dispositivos móviles.
- 🔐 Gestión de eventos por parte de las agrupaciones.

## 🛠️ Stack tecnológico

Consulta [la guía de arquitectura](docs/architecture.md) para saber dónde colocar
rutas, componentes, funcionalidades e integraciones. La portada es provisional.

- **Next.js** — Framework principal.
- **React** — Construcción de componentes e interfaces.
- **JavaScript** — Lógica de la aplicación.
- **Tailwind CSS** — Estilos.
- **Supabase** — Base de datos y autenticación previstas; integración pendiente.
- **Git & GitHub** — Control de versiones y colaboración.

## 🚀 Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd waddle
```

Instala las dependencias:

```bash
npm install
```

Al integrar Supabase, copia `.env.example` a `.env.local` y completa la URL y la
clave publicable. La portada actual funciona sin estas variables. No subas
`.env.local` ni el secreto de Google al repositorio.

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre en tu navegador:

```text
http://localhost:3000
```

## 🌿 Flujo de trabajo

Antes de comenzar:

```bash
git pull
```

Crea una rama para tu funcionalidad:

```bash
git checkout -b feature/nombre-funcionalidad
```

Guarda tus cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push -u origin feature/nombre-funcionalidad
```

Luego crea un **Pull Request** para integrar los cambios a la rama principal.

## 🐧 Sobre Waddle

**Waddle** hace referencia a la forma característica de caminar de los pingüinos, mascota e identidad visual del proyecto.

Nuestro objetivo es crear un punto de encuentro digital para la comunidad de Informática.

---

<p align="center">
  🐧 <b>Waddle</b> — Eventos, comunidad e informática.
</p>
