import { Navbar } from "./components/organisms/Navbar.tsx";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

type Person = {
  id: number;
  name: string;
  location: {
    lat: number;
    long: number;
  };
};

function App() {
  const people: Person[] = [
    {
      id: 1,
      name: "Jane Doe",
      location: {
        lat: 40.73960478942355,
        long: -73.98353141775158,
      },
    },
    {
      id: 2,
      name: "Zita Orn",
      location: {
        lat: 40.74962984687601,
        long: -73.98145638837559,
      },
    },
    {
      id: 3,
      name: "Brandy Effertz",
      location: {
        lat: 40.74173177355469,
        long: -73.99294374020184,
      },
    },
    {
      id: 4,
      name: "Justen Hegmann",
      location: {
        lat: 40.75422965097138,
        long: -74.00268635126298,
      },
    },
    {
      id: 5,
      name: "Blaise Cummerata",
      location: {
        lat: 40.74673262173286,
        long: -73.9848281301488,
      },
    },
  ];

  const itemTemplate = (person: Person) => (
    <div className="sm:col-12 md:col-6 lg:col-4 p-2">
      <div className="flex flex-column p-4 border-1 surface-border surface-card border-round h-full">
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img
            className="w-9 border-round"
            src={`src/assets/img/avatars/avatar-${person.id}.png`}
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
          <div
            className="m-4"
            style={{ height: "100%", backgroundColor: "green" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
