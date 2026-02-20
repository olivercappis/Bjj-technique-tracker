import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Header } from "./header";
import { Breadcrumbs } from "./breadcrumbs";
import { Footer } from "./footer";
import { SearchDialog } from "@/components/search-dialog";
import { PageTransition } from "@/components/page-transition";

export function RootLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <Breadcrumbs />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
