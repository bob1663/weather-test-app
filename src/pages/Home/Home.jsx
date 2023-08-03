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

const Home = () => {
  /* const apiKey = "ECL2N67ZCS9E9FZSTFEBE2BBH";
  const city = "Barcelona";
  const date1 = "2023-08-02"; // Replace this with the current date in the format 'YYYY-MM-DD'
  const date2 = "2023-08-17";

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
 */

  const cityData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
  }));

  const dayData = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
  }));

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="home">
      <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}/>
      <div className="home__container">
        <Navbar />
        <div className="home__content">
          <Searchbar />
          <div className="home__content-cities_container">
            <div className="home__content-cities">
              {cityData.map((city) => (
                <CityCard key={city.id} />
              ))}
            </div>
            <button onClick={() => setModalOpen(true)}>
              <h1>+</h1>
              <h1>Add trip</h1>
            </button>
          </div>
          <div className="home__week">
            <h1>Week</h1>
            <div className="home__week-days">
              {dayData.map((day) => (
                <DayCard key={day.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="home__sidemenu">
          <Sidemenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
