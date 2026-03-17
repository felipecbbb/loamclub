import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-cream)]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
