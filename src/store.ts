import { create } from "zustand";

interface MapState {
  map: google.maps.Map | null;
  googleInstance: typeof google | null;
  setMap: (map: google.maps.Map) => void;
  setGoogleInstance: (newGoogleInstance: typeof google) => void;
  markers: google.maps.Marker[];
  addMarker: (marker: google.maps.Marker) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  map: null,
  googleInstance: null,
  setMap: (map) => set(() => ({ map })),
  setGoogleInstance: (newGoogleInstance) =>
    set(() => ({ googleInstance: newGoogleInstance })),
  markers: [],
  addMarker: (marker) =>
    set((state) => ({ markers: [...state.markers, marker] })),
}));
