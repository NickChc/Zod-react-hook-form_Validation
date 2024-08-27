import { TUser } from "@src/@types/general";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function GlobalProvider() {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Outlet />
    </GlobalContext.Provider>
  );
}
