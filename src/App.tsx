import React from "react";
import { Ellipsis } from "react-css-spinners";
import Legend from "./components/Legend";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import useStations from "./hooks/useStations";

const App: React.FC = () => {
  const { loading, stations } = useStations();

  return (
    <div className="app">
      {!loading ? (
        <>
          <SearchBar />
          <Legend />
          <Map stations={stations} />
        </>
      ) : (
        <Ellipsis size={200} className="spinner" />
      )}
    </div>
  );
};

export default App;
