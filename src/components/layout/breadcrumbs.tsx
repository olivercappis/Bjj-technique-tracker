import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

export function Breadcrumbs() {
  const crumbs = useBreadcrumbs();

  if (crumbs.length <= 1) return null;

  return (
    <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
      <ol className="flex items-center gap-1.5 overflow-x-auto text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
              )}
              {isLast ? (
                <span className="truncate font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="truncate text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
