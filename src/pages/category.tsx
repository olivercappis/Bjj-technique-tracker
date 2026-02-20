import { useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { PositionCard } from "@/components/cards/position-card";
import { getCategoryBySlug, getPositionsByCategory } from "@/data";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  if (!category) return <Navigate to="/" replace />;

  const positions = getPositionsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {category.name}
          </h1>
          <Badge
            variant="outline"
            className="text-xs capitalize text-muted-foreground"
          >
            {category.perspective}
          </Badge>
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {category.description}
        </p>
      </div>

      {/* Position Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {positions.map((position) => (
          <motion.div key={position.id} variants={itemVariants}>
            <PositionCard
              position={position}
              categorySlug={category.slug}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
