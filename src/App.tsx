import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Navbar } from "./components/organisms/Navbar.tsx";
import MapContainer from "./components/organisms/MapContainer.tsx";
import { type Person } from "./types.ts";
import { randomLocation } from "./utils.ts";

function App() {
  const people: Person[] = [
    {
      id: 1,
      name: "Jane Doe",
      location: randomLocation([-73.985428, 40.748817]),
    },
    {
      id: 2,
      name: "Zita Orn",
      location: randomLocation([-73.985428, 40.748817]),
    },
    {
      id: 3,
      name: "Brandy Effertz",
      location: randomLocation([-73.985428, 40.748817]),
    },
    {
      id: 4,
      name: "Justen Hegmann",
      location: randomLocation([-73.985428, 40.748817]),
    },
    {
      id: 5,
      name: "Blaise Cummerata",
      location: randomLocation([-73.985428, 40.748817]),
    },
  ];

  const itemTemplate = (person: Person) => (
    <div className="sm:col-12 md:col-6 lg:col-4 p-2">
      <div className="flex flex-column p-4 border-1 surface-border surface-card border-round h-full">
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img
            className="w-9 border-round"
            src={`/img/avatars/avatar-${person.id}.png`}
            alt=""
          />
          <div className="font-bold text-sm">{person.name}</div>
        </div>
        <footer className="mt-auto text-center">
          <Button
            icon="pi pi-map-marker"
            rounded
            raised
            severity="success"
            aria-label={`Show location of ${person.name}`}
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
