import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Person } from "../../types.ts";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places"],
  authReferrerPolicy: "origin",
});

type MapContainerProps = {
  people: Person[];
};

function MapContainer({ people }: MapContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const defaultMapOptions = {
      center: {
        lat: 40.748817,
        lng: -73.985428,
      },
      zoom: 14,
    };
    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(
          ref.current as HTMLDivElement,
          defaultMapOptions
        );

        for (const person of people) {
          const marker = new google.maps.Marker({
            position: person.location,
            title: person.name,
            icon: {
              url: `/img/avatars/avatar-${person.id}.png`,
              scaledSize: new google.maps.Size(50, 50),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 0),
            },
          });
          marker.setMap(map);
        }

        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: defaultMapOptions.center,
          radius: 2000,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [people]);

  return <div ref={ref} className="h-full w-full"></div>;
}

export default MapContainer;
