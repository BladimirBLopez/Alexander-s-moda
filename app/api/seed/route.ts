/*
 * Inicialización deshabilitada.
 *
 * La base de datos ya contiene información real.
 * Esta ruta no debe volver a cargar datos iniciales
 * ni sobrescribir fotografías, telas o uniformes.
 *
 * El código anterior está conservado en un respaldo.
 */

export async function POST() {
  return Response.json(
    {
      ok: false,
      error:
        "Inicialización deshabilitada para proteger los datos existentes.",
    },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
