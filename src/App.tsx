import { lazy, Suspense } from "react";
import type { MouseEvent } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
const Navbar = lazy(() => import("./components/organisms/Navbar.tsx"));
const MapContainer = lazy(
  () => import("./components/organisms/MapContainer.tsx")
);
import type { Location, Person } from "./types.ts";
import data from "./data.ts";
import { useMapStore } from "./store.ts";
import { defaultMapOptions } from "./utils.ts";
import { Avatar } from "primereact/avatar";
import "./App.css";

function App() {
  const { map, googleInstance } = useMapStore((state) => state);

  const people: Person[] = data;

  const centerOnPerson =
    (person: Person) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      map?.setCenter(person.location);
      map?.setZoom(20);
    };

  function calcDistance(target: Location): string {
    if (googleInstance) {
      const distance =
        googleInstance.maps.geometry.spherical.computeDistanceBetween(
          new googleInstance.maps.LatLng(
            defaultMapOptions.center.lat,
            defaultMapOptions.center.lng
          ),
          new googleInstance.maps.LatLng(target.lat, target.lng)
        );

      return new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 2,
      }).format(+(distance / 1000).toPrecision(2));
    }

    return "0";
  }

  const itemTemplate = (person: Person) => (
    <div className="flex justify-content-between align-items-center flex-column surface-border px-2 shadow-1 surface-card border-round">
      <Avatar
        image={`/img/avatars/avatar-${person.id}.png`}
        size="xlarge"
        shape="circle"
      />
      <div className="mt-2 mb-2 text-center">
        <div className="font-bold max-w-5rem">{person.name}</div>
      </div>
      <footer className="mt-auto mb-2">
        <Button
          icon="pi pi-map-marker"
          label={`${calcDistance(person.location)} km`}
          raised
          severity="success"
          aria-label={`Show location of ${person.name}`}
          onClick={centerOnPerson(person)}
          size="small"
        />
      </footer>
    </div>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div className="m-4 lg:flex lg:justify-content-between">
        <div className="sm:col-12 lg:col-6 relative">
          <MapContainer people={people} />
        </div>
        <div className="sm:col-12 lg:col-6 flex justify-content-center">
          <DataView
            className="dataview__people"
            value={people}
            itemTemplate={itemTemplate}
            layout="grid"
          />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
