export const metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Panel de control</h1>
      <p className="text-[var(--color-white-75)]">Metricas (MRR, altas, bajas, churn) pendientes.</p>
    </div>
  );
}
