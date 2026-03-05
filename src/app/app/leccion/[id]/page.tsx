export const metadata = { title: "Leccion" };

export default async function LeccionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Leccion</h1>
      <p className="text-[var(--color-white-75)]">
        Reproductor de video y ejercicios pendientes. (ID: {id})
      </p>
    </div>
  );
}
