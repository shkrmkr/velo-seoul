import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  stationInfo: {
    stationName: string;
    availableBikeCount: number;
    rackCount: number;
  };
  onClose: () => void;
}

const StationInfo: React.FC<Props> = ({ stationInfo, onClose }) => {
  const { stationName, availableBikeCount, rackCount } = stationInfo;

  return (
    <div className="station-info">
      <h3 className="station-info__title">{stationName}</h3>
      <AiOutlineCloseCircle className="station-info__close" onClick={onClose} />
      <ul className="station-info__info">
        <li>사용 가능 따릉이: {availableBikeCount} 대</li>
        <li>비어있는 거치대: {rackCount - availableBikeCount} 개소</li>
      </ul>
    </div>
  );
};

export default StationInfo;
