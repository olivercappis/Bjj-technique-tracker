import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import type { PositionCategory } from "@/types";
import { getPositionCountByCategory } from "@/data";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  category: PositionCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const positionCount = getPositionCountByCategory(category.id);
  const Icon = (Icons[category.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Circle;

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link to={`/${category.slug}`}>
        <Card className="group cursor-pointer border-border/50 bg-card transition-colors hover:border-primary/30 hover:bg-accent">
          <CardContent className="flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="text-xs capitalize text-muted-foreground"
              >
                {category.perspective}
              </Badge>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {category.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
            <div className="mt-auto pt-1 text-xs text-muted-foreground">
              {positionCount} {positionCount === 1 ? "position" : "positions"}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
