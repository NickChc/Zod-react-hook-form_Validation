import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@src/assets/styles/global.scss";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";

const SignInPage = lazy(() => import("@src/views/SignInPage"));
const SignUpPage = lazy(() => import("@src/views/SignUpPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
