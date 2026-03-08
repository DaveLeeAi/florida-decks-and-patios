import { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ChatWidget = lazy(() => import("./ChatWidget"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
