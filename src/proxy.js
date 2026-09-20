import { NextResponse } from "next/server";

// Pendiente: renovar la sesión cuando se integre Supabase.
// Actualmente solo deja pasar solicitudes; no autentica ni protege rutas.
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/onboarding", "/perfil", "/guardados", "/gestion/:path*"],
};
