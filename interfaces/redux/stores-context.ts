import { createContext, useContext } from "react";
import { Root } from "../tiendas";

export interface GlobalContent {
  arrayStores: Root;
  setArrayStores: (c: Root) => void;
}

export const MyStoresGlobalContext = createContext<GlobalContent>({
  arrayStores: {
    ruta: undefined,
    tiendas: [],
  },
  setArrayStores: () => {},
});

export const useStoresGlobalContext = () => useContext(MyStoresGlobalContext);
