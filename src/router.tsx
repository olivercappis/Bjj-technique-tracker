import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/root-layout";
import { HomePage } from "@/pages/home";
import { CategoryPage } from "@/pages/category";
import { PositionPage } from "@/pages/position";
import { TechniquePage } from "@/pages/technique";
import { NotFoundPage } from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":categorySlug",
        element: <CategoryPage />,
      },
      {
        path: ":categorySlug/:positionSlug",
        element: <PositionPage />,
      },
      {
        path: ":categorySlug/:positionSlug/:techniqueSlug",
        element: <TechniquePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
