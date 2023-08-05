import { useEffect, useState } from "react";
import {
  CityCard,
  DayCard,
  Modal,
  Navbar,
  Searchbar,
  Sidemenu,
} from "../../components";
import "./Home.css";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [trips, setTrips] = useState([
    { city: "London", date1: getInitialDate(2), date2: getInitialDate(4) },
    { city: "Dubai", date1: getInitialDate(5), date2: getInitialDate(10) },
  ]);

  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [selectedTodaysWeather, setSelectedTodaysWeather] = useState(trips[0]);
  const [selectedData, setSelectedData] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(trips);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { city, date1, date2 } = selectedTrip;
      const apiKey = "3RDZJHXLV34C74M32H5B593L8";
      const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

      const todaysWeatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

      const response = await axios.get(weatherApiUrl);
      const todaysWeatherResponse = await axios.get(todaysWeatherApiUrl);

      setSelectedData(response.data);
      setSelectedTodaysWeather(todaysWeatherResponse.data);

      setLoading(false);
    };
    fetchData();
  }, [selectedTrip]);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  useEffect(() => {
    console.log(selectedData);
    console.log(selectedTodaysWeather);
  }, [selectedData, selectedTodaysWeather]);

  function getInitialDate(daysToAdd) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysToAdd);
    return futureDate.toISOString().split("T")[0];
  }

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
            <MutatingDots
              height="100"
              width="100"
              color="#000000"
              secondaryColor="#000000"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
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
                  {selectedData &&
                    selectedData.days &&
                    selectedData.days.map((day, index) => (
                      <DayCard key={index} data={day} />
                    ))}
                </div>
              </div>
            </div>
            <div className="home__sidemenu">
              <Sidemenu
                data={selectedTodaysWeather}
                selectedTrip={selectedTrip}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
