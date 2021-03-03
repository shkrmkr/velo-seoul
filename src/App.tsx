import React from "react";
import { Ellipsis } from "react-css-spinners";
import { Legend } from "./components/Legend";
import { Map } from "./components/Map";
import { TopBar } from "./components/TopBar";
import { useUserLocation } from "./contexts/UserLocation";
import { useStations } from "./hooks/useStations";

export const App: React.FC = () => {
  const { loading, stations } = useStations();
  const { userLocation } = useUserLocation();

  return (
    <div className="app">
      {loading ? (
        <Ellipsis size={200} className="spinner" />
      ) : (
        <>
          <TopBar />
          <Legend />
          <Map
            stations={stations}
            center={userLocation}
            zoomLevel={userLocation && 16}
          />
        </>
      )}
    </div>
  );
};
