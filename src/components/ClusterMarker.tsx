import React, { useMemo } from "react";

interface Props {
  pointCount: number;
  lat: number;
  lng: number;
}

export const ClusterMarker: React.FC<Props> = ({ pointCount }) => {
  const clusterSize = useMemo(() => Math.min(50, 20 + pointCount), [
    pointCount,
  ]);

  return (
    <div
      style={{
        boxSizing: "content-box",
        width: `${clusterSize}px`,
        height: `${clusterSize}px`,
        backgroundColor: "#35495e",
        color: "#fff",
        fontWeight: "bold",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        fontSize: "1.2rem",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      {pointCount}
    </div>
  );
};
