import { Navbar, Searchbar, Sidemenu } from "../../components";
import "./Home.css";
const Home = () => {
  /* const apiKey = "ECL2N67ZCS9E9FZSTFEBE2BBH";
  const city = "Barcelona";
  const date1 = "2023-08-02"; // Replace this with the current date in the format 'YYYY-MM-DD'
  const date2 = "2023-08-10";

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Do something with the fetched data here
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    }); */
  return (
    <div className="home">
      <Navbar />
      <div className="home__content">
        <Searchbar />
      </div>
      <div className="home__sidemenu">
        <Sidemenu />
      </div>
    </div>
  );
};

export default Home;
