import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@src/assets/styles/global.scss";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PublicLayout } from "@src/layouts/PublicLayout";
import { GlobalProvider } from "./providers/GlobalProvider";

const SignInPage = lazy(() => import("@src/views/SignInPage"));
const SignUpPage = lazy(() => import("@src/views/SignUpPage"));
const ProfilePage = lazy(() => import("@src/views/ProfilePage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <GlobalProvider />,
    children: [
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
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
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
