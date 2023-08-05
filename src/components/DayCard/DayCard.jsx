import { format, parseISO } from "date-fns";
import "./DayCard.css";
import { WiDayRainWind } from "react-icons/wi";
import images from "../../constants/images";

const DayCard = ({ data }) => {
  const datetime = parseISO(data.datetime);
  const dayName = format(datetime, "EEEE");

  const maxTemperature = Math.round(data.feelslikemax);
  const minTemperature = Math.round(data.feelslikemin);

  const iconKey = data.icon;
  const camelCaseIconKey = iconKey
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

  const weatherIcon = images[camelCaseIconKey];
  return (
    <div className="daycard">
      <p>{dayName}</p>
      <img src={weatherIcon} alt="Weather Icon" />
      <h3>
        {maxTemperature}
        °/{minTemperature}°
      </h3>
    </div>
  );
};

export default DayCard;
