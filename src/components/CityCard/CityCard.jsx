import { cities } from "../../constants/constants";
import "./CityCard.css";
import { format } from "date-fns";

const CityCard = ({ data, selectTrip, isActive }) => {
  const selectedCity = cities.find((city) => city.name === data.city);

  const formattedDate1 = format(new Date(data.date1), "dd.MM.yyyy");
  const formattedDate2 = format(new Date(data.date2), "dd.MM.yyyy");
  return (
    <div
      className={isActive ? "citycard active" : "citycard"}
      onClick={selectTrip}
    >
      <img src={selectedCity.imgUrl} alt="City" />
      <div className="citycard__info">
        <h1>{data.city}</h1>
        <p>
          {formattedDate1} - {formattedDate2}
        </p>
      </div>
    </div>
  );
};

export default CityCard;
