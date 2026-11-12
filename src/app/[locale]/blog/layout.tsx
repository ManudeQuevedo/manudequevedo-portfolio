import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";

// BlogLayout keeps the original portfolio chrome for secondary pages now that the home page ships its own.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="noise-overlay" />
      <Navbar />
      <SidebarNav />
      {children}
      <Footer />
    </Providers>
  );
}
