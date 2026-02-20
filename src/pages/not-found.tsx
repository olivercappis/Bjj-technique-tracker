import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This position doesn't exist — maybe you've been swept.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
