import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "primereact/button";
import type { MouseEvent } from "react";
import type { Person } from "../../types.ts";
import { useMapStore } from "../../store.ts";
import { defaultMapOptions } from "../../utils.ts";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["geometry"],
  authReferrerPolicy: "origin",
});

type MapContainerProps = {
  people: Person[];
};

function MapContainer({ people }: MapContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { map, setMap, setGoogleInstance } = useMapStore((state) => state);

  useEffect(() => {
    loader
      .load()
      .then((google) => {
        setGoogleInstance(google);

        const newMap = new google.maps.Map(
          ref.current as HTMLDivElement,
          defaultMapOptions
        );

        new google.maps.Marker({
          position: defaultMapOptions.center,
          title: "Empire State Building",
          icon: {
            url: "/img/The_Empire_State_Building.jpg",
            scaledSize: new google.maps.Size(50, 50),
          },
          map: newMap,
          optimized: false,
        });

        for (const person of people) {
          new google.maps.Marker({
            position: person.location,
            title: person.name,
            icon: {
              url: `/img/avatars/avatar-${person.id}.png`,
              scaledSize: new google.maps.Size(50, 50),
            },
            map: newMap,
            optimized: false,
          });
        }

        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: newMap,
          center: defaultMapOptions.center,
          radius: 2000,
        });

        setMap(newMap);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [people, setGoogleInstance, setMap]);

  const reCenter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    map?.setCenter(defaultMapOptions.center);
    map?.setZoom(20);
  };

  const reset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    map?.setCenter(defaultMapOptions.center);
    map?.setZoom(defaultMapOptions.zoom);
  };

  return (
    <>
      <div id="map" ref={ref}></div>
      <div className="my-2">
        <Button
          label="Recenter map"
          onClick={reCenter}
          outlined
          className="mr-1"
          icon="pi pi-compass"
          iconPos="right"
          size="small"
        />
        <Button
          label="Reset map"
          onClick={reset}
          severity="secondary"
          text
          icon="pi pi-map"
          iconPos="right"
          size="small"
        />
      </div>
    </>
  );
}

export default MapContainer;
