import { useEffect, useState } from "react";
import {
  CityCard,
  DayCard,
  Loader,
  Modal,
  Navbar,
  Searchbar,
  Sidemenu,
} from "../../components";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [trips, setTrips] = useState([
    { city: "Sydney", date1: getInitialDate(5), date2: getInitialDate(10) },
  ]);

  function getInitialDate(daysToAdd) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysToAdd);
    return futureDate.toISOString().split("T")[0];
  }

  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [selectedTodaysWeather, setSelectedTodaysWeather] = useState(trips[0]);
  const [selectedData, setSelectedData] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(trips);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { city, date1, date2 } = selectedTrip;
      const apiKey = "ECL2N67ZCS9E9FZSTFEBE2BBH";
      const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

      const todaysWeatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

      const response = await axios.get(weatherApiUrl);
      const todaysWeatherResponse = await axios.get(todaysWeatherApiUrl);

      console.log(response.data);
      console.log(todaysWeatherResponse.data);

      setSelectedData(response.data);
      setSelectedTodaysWeather(todaysWeatherResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [selectedTrip]);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  return (
    <div className="home">
      <Modal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        addTrip={(trip) => setTrips((prev) => [...prev, trip])}
      />
      <div className="home__container">
        <Navbar />
        {loading ? (
          <div className="loading__container">
            <Loader />
          </div>
        ) : (
          <>
            <div className="home__content">
              <Searchbar trips={trips} setFilteredTrips={setFilteredTrips} />
              <div className="home__content-cities_container">
                <div className="home__content-cities">
                  {filteredTrips.length === 0 ? (
                    <div className="home__content-cities_notfound">
                      <h1>No trips available</h1>
                    </div>
                  ) : (
                    filteredTrips.map((trip, index) => (
                      <CityCard
                        key={index}
                        data={trip}
                        selectTrip={() => setSelectedTrip(trip)}
                        isActive={trip === selectedTrip}
                      />
                    ))
                  )}
                </div>
                <button onClick={() => setModalOpen(true)}>
                  <h1>+</h1>
                  <h1>Add trip</h1>
                </button>
              </div>
              <div className="home__week">
                <h1>Week</h1>
                <div className="home__week-days">
                  <DayCard />
                </div>
              </div>
            </div>
            <div className="home__sidemenu">
              <Sidemenu data={selectedTodaysWeather} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
