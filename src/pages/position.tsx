import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { TechniqueCard } from "@/components/cards/technique-card";
import {
  getCategoryBySlug,
  getPositionBySlug,
  getTechniquesByPosition,
} from "@/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TechniqueType } from "@/types";

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const typeFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "submission", label: "Submissions" },
  { value: "sweep", label: "Sweeps" },
  { value: "escape", label: "Escapes" },
  { value: "pass", label: "Passes" },
  { value: "transition", label: "Transitions" },
  { value: "takedown", label: "Takedowns" },
];

export function PositionPage() {
  const { categorySlug, positionSlug } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const position =
    categorySlug && positionSlug
      ? getPositionBySlug(categorySlug, positionSlug)
      : undefined;

  if (!category || !position) return <Navigate to="/" replace />;

  const allTechniques = getTechniquesByPosition(position.id);
  const techniques =
    activeFilter === "all"
      ? allTechniques
      : allTechniques.filter(
          (t) => t.type === (activeFilter as TechniqueType)
        );

  // Only show filter tabs that have techniques
  const availableTypes = new Set(allTechniques.map((t) => t.type));
  const visibleFilters = typeFilters.filter(
    (f) => f.value === "all" || availableTypes.has(f.value as TechniqueType)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {position.name}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {position.description}
        </p>

        {/* Key Points */}
        {position.keyPoints.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {position.keyPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filter Tabs */}
      {visibleFilters.length > 2 && (
        <Tabs
          value={activeFilter}
          onValueChange={setActiveFilter}
          className="mb-6"
        >
          <TabsList className="h-auto flex-wrap">
            {visibleFilters.map((filter) => (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
                className="text-xs sm:text-sm"
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Technique List */}
      {techniques.length > 0 ? (
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-3"
        >
          {techniques.map((technique) => (
            <motion.div key={technique.id} variants={itemVariants}>
              <TechniqueCard
                technique={technique}
                categorySlug={category.slug}
                positionSlug={position.slug}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          No {activeFilter} techniques found for this position.
        </div>
      )}
    </div>
  );
}
