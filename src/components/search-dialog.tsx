import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchAll, positions, categories } from "@/data";
import { Shield, MapPin, Swords } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.length > 0 ? searchAll(query) : null;

  const handleSelect = useCallback(
    (path: string) => {
      onOpenChange(false);
      setQuery("");
      navigate(path);
    },
    [navigate, onOpenChange]
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  function getCategorySlugForPosition(positionId: string) {
    const position = positions.find((p) => p.id === positionId);
    if (!position) return "";
    const category = categories.find((c) => c.id === position.categoryId);
    return category?.slug ?? "";
  }

  function getPositionSlugForTechnique(positionId: string) {
    const position = positions.find((p) => p.id === positionId);
    return position?.slug ?? "";
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search positions, techniques..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {results?.categories && results.categories.length > 0 && (
          <CommandGroup heading="Categories">
            {results.categories.map((cat) => (
              <CommandItem
                key={cat.id}
                onSelect={() => handleSelect(`/${cat.slug}`)}
              >
                <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                {cat.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {results?.positions && results.positions.length > 0 && (
          <CommandGroup heading="Positions">
            {results.positions.map((pos) => {
              const cat = categories.find((c) => c.id === pos.categoryId);
              return (
                <CommandItem
                  key={pos.id}
                  onSelect={() =>
                    handleSelect(`/${cat?.slug ?? ""}/${pos.slug}`)
                  }
                >
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{pos.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {cat?.name}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
        {results?.techniques && results.techniques.length > 0 && (
          <CommandGroup heading="Techniques">
            {results.techniques.slice(0, 10).map((tech) => {
              const catSlug = getCategorySlugForPosition(tech.positionId);
              const posSlug = getPositionSlugForTechnique(tech.positionId);
              return (
                <CommandItem
                  key={tech.id}
                  onSelect={() =>
                    handleSelect(`/${catSlug}/${posSlug}/${tech.slug}`)
                  }
                >
                  <Swords className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{tech.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {tech.type}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
