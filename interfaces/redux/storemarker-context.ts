import { createContext, useContext } from "react";
import { MarkerZoom } from "../map";

export interface GlobalContent {
  marker: MarkerZoom;
  setMarker: (c: MarkerZoom) => void;
  closeMenu: () => void;
}

export const MyMarkerGlobalContext = createContext<GlobalContent>({
  marker: {
    name: "",
    zoom: 12,
  },
  setMarker: () => {},
  closeMenu: () => {},
});

export const useMarkerGlobalContext = () => useContext(MyMarkerGlobalContext);
