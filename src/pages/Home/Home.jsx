import { useEffect, useState } from "react";
import {
  CityCard,
  DayCard,
  Filter,
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
  const [trips, setTrips] = useState(
    JSON.parse(sessionStorage.getItem("citycards")) || [
      { city: "London", date1: getInitialDate(2), date2: getInitialDate(4) },
      { city: "Dubai", date1: getInitialDate(5), date2: getInitialDate(10) },
    ]
  );
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [selectedTodaysWeather, setSelectedTodaysWeather] = useState(trips[0]);
  const [selectedData, setSelectedData] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("date");
  const [isAscending, setIsAscending] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { city, date1, date2 } = selectedTrip;
        const apiKey = "3RDZJHXLV34C74M32H5B593L8";

        const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
        const todaysWeatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

        const [response, todaysWeatherResponse] = await Promise.all([
          axios.get(weatherApiUrl),
          axios.get(todaysWeatherApiUrl),
        ]);

        setSelectedData(response.data);
        setSelectedTodaysWeather(todaysWeatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTrip]);

  useEffect(() => {
    const sortedAndFilteredTrips = [...trips]
      .filter((trip) =>
        trip.city.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "date") {
          return isAscending
            ? a.date1.localeCompare(b.date1)
            : b.date1.localeCompare(a.date1);
        } else if (sortOrder === "name") {
          return isAscending
            ? a.city.localeCompare(b.city)
            : b.city.localeCompare(a.city);
        } else if (sortOrder === "length") {
          const lengthA = new Date(a.date2) - new Date(a.date1);
          const lengthB = new Date(b.date2) - new Date(b.date1);
          return isAscending ? lengthA - lengthB : lengthB - lengthA;
        }
        return 0;
      });

    setFilteredTrips(sortedAndFilteredTrips);
    sessionStorage.setItem("citycards", JSON.stringify(trips));
  }, [trips, filterText, sortOrder, isAscending]);

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

  const handleAddTrip = (trip) => {
    setTrips((prevTrips) => [...prevTrips, trip]);
    setSelectedTrip(trip);
  };

  const handleDeleteTrip = (city) => {
    if (trips.length === 1) {
      return;
    }

    const updatedTrips = trips.filter((trip) => trip.city !== city);
    setTrips(updatedTrips);

    if (selectedTrip.city === city) {
      setSelectedTrip(updatedTrips[0] || null);
    }

    sessionStorage.setItem("citycards", JSON.stringify(updatedTrips));
  };

  const scrollToSelectedTrip = (trip, el) => {
    if (trip === selectedTrip && el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div className="home">
      <Modal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        addTrip={handleAddTrip}
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
              <div className="home__content-filters">
                <Searchbar trips={trips} setFilteredTrips={setFilteredTrips} />
                <Filter
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  isAscending={isAscending}
                  setIsAscending={setIsAscending}
                />
              </div>
              <div className="home__content-cities_container">
                <div className="home__content-cities">
                  {filteredTrips.length === 0 ? (
                    <div className="home__content-cities_notfound">
                      <h1>No trips available</h1>
                    </div>
                  ) : (
                    filteredTrips.map((trip, index) => (
                      <div
                        key={index}
                        ref={(el) => scrollToSelectedTrip(trip, el)}
                      >
                        <CityCard
                          data={trip}
                          selectTrip={() => setSelectedTrip(trip)}
                          isActive={trip === selectedTrip}
                          deleteTrip={() => handleDeleteTrip(trip.city)}
                          shouldShowDeleteIcon={trips.length > 1}
                        />
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => setModalOpen(true)}>
                  <h1>+</h1>
                  <h1>Add trip</h1>
                </button>
              </div>
              <div className="home__week">
                <h1>Week ({selectedTrip.city})</h1>
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
