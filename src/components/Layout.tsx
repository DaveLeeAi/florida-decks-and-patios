import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  heroPage?: boolean;
}

export default function Layout({ children, heroPage = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 ${heroPage ? "" : "pt-16 md:pt-20"}`}>{children}</main>
      <Footer />
    </div>
  );
}
