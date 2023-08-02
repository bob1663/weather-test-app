import "./Sidemenu.css";
import { WiDayRainWind } from "react-icons/wi";

const Sidemenu = () => {
  return (
    <div className="sidemenu">
      <div className="sidemenu__weather">
        <h2>Sunday</h2>
        <div>
          <WiDayRainWind size={96} color="#ffffff" />
          <h1>
            24<sup>°C</sup>
          </h1>
        </div>
        <h3>Berlin</h3>
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
