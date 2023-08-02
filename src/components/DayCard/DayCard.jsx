import "./DayCard.css";
import { WiDayRainWind } from "react-icons/wi";

const DayCard = () => {
  return (
    <div className="daycard">
      <p>Monday</p>
      <WiDayRainWind size={64} />
      <h3>28°/21°</h3>
    </div>
  );
};

export default DayCard;
