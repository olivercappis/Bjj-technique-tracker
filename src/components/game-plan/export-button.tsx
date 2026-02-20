import { useCallback } from "react";
import { useReactFlow, getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.download = "game-plan.png";
  a.href = dataUrl;
  a.click();
}

export function ExportButton() {
  const { getNodes } = useReactFlow();

  const handleExport = useCallback(() => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, IMAGE_WIDTH, IMAGE_HEIGHT, 0.5, 2, 0.1);

    const viewportEl = document.querySelector<HTMLElement>(".react-flow__viewport");
    if (!viewportEl) return;

    toPng(viewportEl, {
      backgroundColor: "#0f1117",
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      style: {
        width: String(IMAGE_WIDTH),
        height: String(IMAGE_HEIGHT),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
      filter: (node) => {
        if (node instanceof Element) {
          return (
            !node.classList.contains("react-flow__minimap") &&
            !node.classList.contains("react-flow__controls") &&
            !node.classList.contains("react-flow__panel")
          );
        }
        return true;
      },
    }).then(downloadImage);
  }, [getNodes]);

  return (
    <button
      onClick={handleExport}
      className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors shadow-sm flex items-center gap-1.5"
    >
      <Download size={12} />
      Export PNG
    </button>
  );
}
