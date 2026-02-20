import { useParams, Navigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypeBadge } from "@/components/type-badge";
import { DifficultyIndicator } from "@/components/difficulty-indicator";
import {
  getCategoryBySlug,
  getPositionBySlug,
  getTechniqueBySlug,
  getTechniquesByPosition,
} from "@/data";
import { Lightbulb } from "lucide-react";

export function TechniquePage() {
  const { categorySlug, positionSlug, techniqueSlug } = useParams();

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const position =
    categorySlug && positionSlug
      ? getPositionBySlug(categorySlug, positionSlug)
      : undefined;
  const technique =
    position && techniqueSlug
      ? getTechniqueBySlug(position.id, techniqueSlug)
      : undefined;

  if (!category || !position || !technique) {
    return <Navigate to="/" replace />;
  }

  const relatedTechniques = getTechniquesByPosition(position.id).filter(
    (t) => t.id !== technique.id
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {technique.name}
          </h1>
          <TypeBadge type={technique.type} />
        </div>
        <div className="mt-3 flex items-center gap-4">
          <DifficultyIndicator
            difficulty={technique.difficulty}
            showLabel
          />
          <div className="flex gap-1.5">
            {technique.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {technique.description}
        </p>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-bold text-foreground mb-4">
          Step by Step
        </h2>
        <ol className="space-y-3">
          {technique.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-foreground/90">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {technique.tips.length > 0 && (
        <Card className="mb-8 border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h2 className="font-heading text-sm font-bold text-amber-400">
                Tips & Common Mistakes
              </h2>
            </div>
            <ul className="space-y-2">
              {technique.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Related Techniques */}
      {relatedTechniques.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Other Techniques from {position.name}
          </h2>
          <div className="grid gap-2">
            {relatedTechniques.map((t) => (
              <Link
                key={t.id}
                to={`/${category.slug}/${position.slug}/${t.slug}`}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-3 transition-colors hover:border-primary/30 hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  <TypeBadge type={t.type} />
                </div>
                <DifficultyIndicator difficulty={t.difficulty} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
