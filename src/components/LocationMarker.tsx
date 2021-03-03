import React from "react";
import marker0 from "../assets/images/map-marker0.png";
import marker13 from "../assets/images/map-marker13.png";
import marker46 from "../assets/images/map-marker46.png";
import marker7 from "../assets/images/map-marker7.png";

interface Props {
  lat: number;
  lng: number;
  availableBikeCount: number;
  onClick: () => void;
}

export const LocationMarker: React.FC<Props> = ({
  lat,
  lng,
  availableBikeCount,
  onClick,
}) => {
  const marker = () => {
    if (availableBikeCount >= 7) {
      return <img src={marker7} alt="7 or more bikes" />;
    } else if (availableBikeCount >= 4) {
      return <img src={marker46} alt="between 4 to 6 bikes" />;
    } else if (availableBikeCount >= 1) {
      return <img src={marker13} alt="between 1 to 3 bikes" />;
    } else {
      return <img src={marker0} alt="no bikes" />;
    }
  };

  return (
    <div className="location-marker" onClick={onClick}>
      {marker()}
    </div>
  );
};
