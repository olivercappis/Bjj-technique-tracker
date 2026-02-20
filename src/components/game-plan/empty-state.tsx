import { Link } from "react-router-dom";
import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <GitBranch className="h-8 w-8 text-primary" />
      </div>
      <h2 className="font-heading text-xl font-bold text-foreground mb-2">
        Your game plan is empty
      </h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Browse techniques and add them to your game plan to build a personalized
        flowchart showing how you move between positions.
      </p>
      <Button asChild>
        <Link to="/">Browse Techniques</Link>
      </Button>
    </div>
  );
}
