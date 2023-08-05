import "./Sidemenu.css";
import { WiDayRainWind } from "react-icons/wi";
import { format, parseISO } from "date-fns";

const Sidemenu = ({ data }) => {
  if (!data || !data.days || !data.days[0] || !data.days[0].datetime) {
    return null;
  }
  const datetime = parseISO(data.days[0].datetime);
  const dayName = format(datetime, "EEEE");

  const temperature = Math.floor(data.days[0].feelslike);

  return (
    <div className="sidemenu">
      <div className="sidemenu__weather">
        <h2>{dayName}</h2>
        <div>
          <WiDayRainWind size={96} color="#ffffff" />
          <h1>
            {temperature}
            <sup>°C</sup>
          </h1>
        </div>
        <h3>{data.address}</h3>
      </div>
      <div className="sidemenu__timer">
        <div className="sidemenu__timer-container">
          <div className="sidemenu__timer-block">
            <h1>30</h1>
            <p>DAYS</p>
          </div>
          <div className="sidemenu__timer-block">
            <h1>15</h1>
            <p>HOURS</p>
          </div>
        </div>
        <div className="sidemenu__timer-container">
          <div className="sidemenu__timer-block">
            <h1>15</h1>
            <p>MINUTES</p>
          </div>
          <div className="sidemenu__timer-block">
            <h1>30</h1>
            <p>SECONDS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
