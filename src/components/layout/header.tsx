import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
            BJJ
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Technique Tracker
          </span>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={onSearchOpen}
          className="gap-2 text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search techniques...</span>
          <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 font-mono text-xs sm:inline-block">
            Ctrl+K
          </kbd>
        </Button>
      </div>
    </header>
  );
}
