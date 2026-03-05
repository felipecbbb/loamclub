export const metadata = { title: "Detalle Alumna" };

export default async function DetalleAlumnaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Detalle alumna</h1>
      <p className="text-[var(--color-white-75)]">
        Perfil de alumna pendiente. (ID: {id})
      </p>
    </div>
  );
}
