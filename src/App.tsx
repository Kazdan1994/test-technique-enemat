import { MouseEvent } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Navbar } from "./components/organisms/Navbar.tsx";
import MapContainer from "./components/organisms/MapContainer.tsx";
import { Location, type Person } from "./types.ts";
import data from "./data.ts";
import { useMapStore } from "./store.ts";
import { defaultMapOptions } from "./utils.ts";
import { Avatar } from "primereact/avatar";

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
    <div className="md:col-12 lg:col-6 p-2">
      <div className="flex flex-column surface-border shadow-1 p-4 surface-card border-round">
        <div className="flex flex-column align-items-center gap-4">
          <Avatar
            image={`/img/avatars/avatar-${person.id}.png`}
            size="xlarge"
            shape="circle"
          />
          <div>
            <span className="font-bold">{person.name}</span>
            <span> - {calcDistance(person.location)} km</span>
          </div>
        </div>
        <footer className="mt-auto text-center my-4">
          <Button
            icon="pi pi-map-marker"
            label={`Locate ${person.name}`}
            raised
            severity="success"
            aria-label={`Show location of ${person.name}`}
            onClick={centerOnPerson(person)}
            size="small"
          />
        </footer>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="flex justify-content-between">
        <div className="col-4">
          <DataView value={people} itemTemplate={itemTemplate} layout="grid" />
        </div>
        <div className="col-8">
          <div className="m-4 relative h-full">
            <MapContainer people={people} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
