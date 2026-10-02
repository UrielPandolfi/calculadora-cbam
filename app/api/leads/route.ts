export async function POST() {
  return Response.json(
    { error: "El registro de solicitudes todavía no está disponible." },
    { status: 503 },
  );
}
