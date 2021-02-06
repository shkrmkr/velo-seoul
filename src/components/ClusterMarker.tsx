import React from "react";

interface Props {
  pointCount: number;
  lat: number;
  lng: number;
}

export default function ClusterMarker({ pointCount }: Props) {
  return (
    <div
      style={{
        boxSizing: "content-box",
        width: `${30 + pointCount / 20}px`,
        height: `${30 + pointCount / 20}px`,
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
}
