import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

export function useGlboalProvider() {
  const { ...data } = useContext(GlobalContext);

  return { ...data };
}
