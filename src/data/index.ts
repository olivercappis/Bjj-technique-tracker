import { categories } from "./categories";
import { positions } from "./positions";
import { techniques } from "./techniques";
import type { TechniqueType } from "@/types";

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getPositionsByCategory(categoryId: string) {
  return positions.filter((p) => p.categoryId === categoryId);
}

export function getPositionBySlug(categorySlug: string, positionSlug: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return positions.find(
    (p) => p.categoryId === category.id && p.slug === positionSlug
  );
}

export function getTechniquesByPosition(positionId: string) {
  return techniques.filter((t) => t.positionId === positionId);
}

export function getTechniqueBySlug(positionId: string, techniqueSlug: string) {
  return techniques.find(
    (t) => t.positionId === positionId && t.slug === techniqueSlug
  );
}

export function getTechniquesByType(type: TechniqueType) {
  return techniques.filter((t) => t.type === type);
}

export function getPositionCountByCategory(categoryId: string) {
  return positions.filter((p) => p.categoryId === categoryId).length;
}

export function getTechniqueCountByPosition(positionId: string) {
  return techniques.filter((t) => t.positionId === positionId).length;
}

export function searchAll(query: string) {
  const q = query.toLowerCase();

  const matchedCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );

  const matchedPositions = positions.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );

  const matchedTechniques = techniques.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );

  return {
    categories: matchedCategories,
    positions: matchedPositions,
    techniques: matchedTechniques,
  };
}

export { categories, positions, techniques };
