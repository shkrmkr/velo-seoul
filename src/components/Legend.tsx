import marker0 from "../assets/images/map-marker0.png";
import marker13 from "../assets/images/map-marker13.png";
import marker46 from "../assets/images/map-marker46.png";
import marker7 from "../assets/images/map-marker7.png";

export default function Legend() {
  return (
    <div className="legend">
      <div className="legend__item">
        <span>0</span>
        <img src={marker0} alt="marker 0" />
      </div>
      <div className="legend__item">
        <span>1 ~ 3</span>
        <img src={marker13} alt="marker 13" />
      </div>
      <div className="legend__item">
        <span>4 ~ 6</span>
        <img src={marker46} alt="marker 46" />
      </div>
      <div className="legend__item">
        <span>7 ~</span>
        <img src={marker7} alt="marker 7" />
      </div>
    </div>
  );
}
