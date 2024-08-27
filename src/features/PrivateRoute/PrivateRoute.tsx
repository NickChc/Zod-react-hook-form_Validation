import { USER } from "@src/config/storageKeys";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: PropsWithChildren) {
  const user = localStorage.getItem(USER);

  if (user) {
    return children;
  }

  return <Navigate to={"/"} />;
}
