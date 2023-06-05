import { Map, GoogleApiWrapper } from "google-maps-react";

type MapContainerProps = {
  google: string;
};

export function MapContainer({ google }: MapContainerProps) {
  return (
    <Map
      google={google}
      style={{ height: "100%", width: "100%" }}
      initialCenter={{
        lat: 40.7484405,
        lng: -73.9856644,
      }}
    />
  );
}

export default GoogleApiWrapper({
  apiKey: import.meta.env.YOUR_GOOGLE_API_KEY_GOES_HERE,
})(MapContainer);
