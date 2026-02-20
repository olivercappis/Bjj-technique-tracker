import { useParams } from "react-router-dom";
import { getCategoryBySlug, getPositionBySlug } from "@/data";
import { techniques } from "@/data";

interface Breadcrumb {
  label: string;
  href: string;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const { categorySlug, positionSlug, techniqueSlug } = useParams();
  const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

  if (!categorySlug) return crumbs;

  const category = getCategoryBySlug(categorySlug);
  crumbs.push({
    label: category?.name ?? categorySlug,
    href: `/${categorySlug}`,
  });

  if (!positionSlug) return crumbs;

  const position = getPositionBySlug(categorySlug, positionSlug);
  crumbs.push({
    label: position?.name ?? positionSlug,
    href: `/${categorySlug}/${positionSlug}`,
  });

  if (!techniqueSlug) return crumbs;

  const technique = position
    ? techniques.find(
        (t) => t.positionId === position.id && t.slug === techniqueSlug
      )
    : undefined;
  crumbs.push({
    label: technique?.name ?? techniqueSlug,
    href: `/${categorySlug}/${positionSlug}/${techniqueSlug}`,
  });

  return crumbs;
}
