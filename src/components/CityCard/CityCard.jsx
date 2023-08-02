import { images } from "../../constants";
import "./CityCard.css";

const CityCard = () => {
  return (
    <div className="citycard">
      <img src={images.berlin} alt="City" />
      <div className="citycard__info">
        <h1>Berlin</h1>
        <p>14.07.2023 - 21.07.2023</p>
      </div>
    </div>
  );
};

export default CityCard;
