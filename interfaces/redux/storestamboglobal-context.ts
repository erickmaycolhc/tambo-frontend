import { createContext, useContext } from "react";
import { Tienda } from "../map";

export interface GlobalContent {
  arrayStoresTambo: Tienda[];
  setArrayStoresTambo: (c: Tienda[]) => void;
}

export const MyStoresTamboGlobalContext = createContext<GlobalContent>({
  arrayStoresTambo: [],
  setArrayStoresTambo: () => [],
});

export const useStoresTamboGlobalContext = () =>
  useContext(MyStoresTamboGlobalContext);
