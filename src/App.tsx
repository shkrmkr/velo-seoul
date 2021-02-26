import React from "react";
import { Ellipsis } from "react-css-spinners";
import Legend from "./components/Legend";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import useStations from "./hooks/useStations";

const App: React.FC = () => {
  const { loading, stations, error } = useStations();

  return (
    <div className="app">
      {loading ? (
        <Ellipsis size={200} className="spinner" />
      ) : (
        <>
          <SearchBar />
          <Legend />
          <Map stations={stations} />
        </>
      )}
    </div>
  );
};

export default App;
