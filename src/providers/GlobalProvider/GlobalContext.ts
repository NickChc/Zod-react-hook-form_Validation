import { TUser } from "@src/@types/general";
import { createContext } from "react";

interface GlobalContextProps {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: () => {},
});
