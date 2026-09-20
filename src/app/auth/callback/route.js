export async function GET() {
  return Response.json(
    { error: "El inicio de sesión todavía no está implementado." },
    { status: 501 },
  );
}
