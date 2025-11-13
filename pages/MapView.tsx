// pages/MapView.tsx
import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const MapComponent: React.FC<{ center: google.maps.LatLngLiteral; zoom: number }> = ({ center, zoom }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: false,
        fullscreenControl: true,
      });

      // Add a sample marker
      new google.maps.Marker({
        position: center,
        map: newMap,
        title: "Tourism Center (Uganda)",
      });

      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

const render = (status: Status) => {
  if (status === Status.LOADING)
    return <div style={{ textAlign: "center", marginTop: "50%" }}>Loading map...</div>;
  if (status === Status.FAILURE)
    return <div style={{ textAlign: "center", color: "red" }}>Error loading map</div>;
  return <MapComponent center={{ lat: 1.3733, lng: 32.2903 }} zoom={7} />;
};

const MapView: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Uganda Map</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div style={{ width: "100%", height: "100vh" }}>
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"}
          render={render}
        />
      </div>
    </IonContent>
  </IonPage>
);

export default MapView;
