import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places"],
  authReferrerPolicy: "origin",
});

function MapContainer() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const defaultMapOptions = {
      center: {
        lat: 40.762312,
        lng: -73.979345,
      },
      zoom: 11,
    };
    loader
      .load()
      .then((google) => {
        new google.maps.Map(ref.current as HTMLDivElement, defaultMapOptions);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return <div ref={ref} className="h-full"></div>;
}

export default MapContainer;
