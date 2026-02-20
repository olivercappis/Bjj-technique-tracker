import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { TypeBadge } from "@/components/type-badge";
import { DifficultyIndicator } from "@/components/difficulty-indicator";
import type { Technique } from "@/types";

interface TechniqueCardProps {
  technique: Technique;
  categorySlug: string;
  positionSlug: string;
}

export function TechniqueCard({
  technique,
  categorySlug,
  positionSlug,
}: TechniqueCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/${categorySlug}/${positionSlug}/${technique.slug}`}
      >
        <Card className="group cursor-pointer border-border/50 bg-card transition-colors hover:border-primary/30 hover:bg-accent">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading font-bold text-foreground">
                  {technique.name}
                </h3>
                <TypeBadge type={technique.type} />
              </div>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {technique.description}
              </p>
              <DifficultyIndicator
                difficulty={technique.difficulty}
                showLabel
              />
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
