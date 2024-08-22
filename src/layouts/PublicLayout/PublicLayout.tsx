import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <Outlet />
      <h1>LAYOUT</h1>
    </>
  );
}
