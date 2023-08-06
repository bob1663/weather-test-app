import "./Sidemenu.css";
import {
  format,
  parseISO,
  differenceInSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import images from "../../constants/images";

const Sidemenu = ({ data, selectedTrip }) => {
  // TIMER
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date1 = parseISO(selectedTrip.date1);
      const days = differenceInDays(date1, now);
      const hours = differenceInHours(date1, now) % 24;
      const minutes = differenceInMinutes(date1, now) % 60;
      const seconds = differenceInSeconds(date1, now) % 60;
      setTimer({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTrip]);

  // INFORMATION
  if (!data || !data.days || !data.days[0] || !data.days[0].datetime) {
    return null;
  }
  const datetime = parseISO(data.days[0].datetime);
  const dayName = format(datetime, "EEEE");

  const temperature = Math.floor(data.days[0].feelslike);

  const iconKey = data.days[0].icon;
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
    <div className="sidemenu">
      {timer.days !== 0 ||
      timer.hours !== 0 ||
      timer.minutes !== 0 ||
      timer.seconds !== 0 ? (
        <>
          <div className="sidemenu__weather">
            <h2>{dayName}</h2>
            <div>
              <img src={weatherIcon} alt="Weather Icon" />
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
                <h1>{timer.days}</h1>
                <p>DAYS</p>
              </div>
              <div className="sidemenu__timer-block">
                <h1>{timer.hours}</h1>
                <p>HOURS</p>
              </div>
            </div>
            <div className="sidemenu__timer-container">
              <div className="sidemenu__timer-block">
                <h1>{timer.minutes}</h1>
                <p>MINUTES</p>
              </div>
              <div className="sidemenu__timer-block">
                <h1>{timer.seconds}</h1>
                <p>SECONDS</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <MutatingDots
          height="100"
          width="100"
          color="#ffffff"
          secondaryColor="#ffffff"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </div>
  );
};

export default Sidemenu;
