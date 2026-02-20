import { motion } from "motion/react";
import { CategoryCard } from "@/components/cards/category-card";
import { getAllCategories } from "@/data";

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function HomePage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          BJJ Technique Tracker
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore positions and techniques across Brazilian Jiu-Jitsu. Drill
          down from categories to individual techniques with step-by-step
          breakdowns.
        </p>
      </div>

      {/* Category Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
