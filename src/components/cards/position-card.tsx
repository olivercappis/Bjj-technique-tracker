import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { Position } from "@/types";
import { getTechniqueCountByPosition } from "@/data";

interface PositionCardProps {
  position: Position;
  categorySlug: string;
}

export function PositionCard({ position, categorySlug }: PositionCardProps) {
  const techniqueCount = getTechniqueCountByPosition(position.id);

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link to={`/${categorySlug}/${position.slug}`}>
        <Card className="group cursor-pointer border-border/50 bg-card transition-colors hover:border-primary/30 hover:bg-accent">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-foreground">
                {position.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {position.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {techniqueCount}{" "}
                {techniqueCount === 1 ? "technique" : "techniques"}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
