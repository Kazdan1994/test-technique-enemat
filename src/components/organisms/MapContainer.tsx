import { useEffect, useRef, MouseEvent } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Person } from "../../types.ts";
import { useMapStore } from "../../store.ts";
import { Button } from "primereact/button";
import { defaultMapOptions } from "../../utils.ts";
import "./Map.css";

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

        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(
            defaultMapOptions.center.lat,
            defaultMapOptions.center.lng
          ),
          new google.maps.LatLng(people[0].location.lat, people[0].location.lng)
        );
        console.log(
          `distance between Empire State Building and ${people[0].name}`,
          (distance / 1000).toFixed(2)
        );
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
      <div className="mb-2">
        <Button
          label="Recenter on the Empire State Building"
          onClick={reCenter}
          outlined
          className="mr-1"
          icon="pi pi-compass"
          iconPos="right"
        />
        <Button
          label="Reset map"
          onClick={reset}
          severity="secondary"
          text
          icon="pi pi-map"
          iconPos="right"
        />
      </div>
      <div id="map" ref={ref}></div>
    </>
  );
}

export default MapContainer;
