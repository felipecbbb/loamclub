export const metadata = { title: "Editar Curso" };

export default async function EditarCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Editar curso</h1>
      <p className="text-[var(--color-white-75)]">
        Editor de curso pendiente. (ID: {id})
      </p>
    </div>
  );
}
