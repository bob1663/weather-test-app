import { useEffect, useState } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { cities } from "../../constants/constants";

const Modal = ({ setModalOpen, modalOpen, addTrip }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const maxDate = new Date(tomorrow.setDate(tomorrow.getDate() + 15))
    .toISOString()
    .split("T")[0];

  const minEndDate = startDate
    ? new Date(startDate).toISOString().split("T")[0]
    : "";
  const maxEndDate = startDate
    ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 15))
        .toISOString()
        .split("T")[0]
    : "";

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = modalOpen === true ? "hidden" : "auto";
  }, [modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCity && startDate && endDate) {
      const newTrip = {
        city: selectedCity,
        date1: startDate,
        date2: endDate,
      };
      addTrip(newTrip);
      setModalOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedCity("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={`modal ${modalOpen ? "active" : ""}`}>
      <form className="modal__form" onSubmit={handleSubmit}>
        <div className="modal__form-header">
          <h1>Create trip</h1>
          <AiOutlineClose
            size={22}
            className="close-icon"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="form-border" />
        <div className="modal__form-content">
          <p>
            <span>*</span>City
          </p>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="" disabled>
              Please select a city
            </option>
            {cities.map((city) => (
              <option value={city.name} key={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <p>
            <span>*</span>Start date
          </p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
          <p>
            <span>*</span>End date
          </p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!startDate}
            min={minEndDate}
            max={maxEndDate}
          />
        </div>
        <div className="form-border" />
        <div className="modal__form-footer">
          <button
            onClick={() => {
              setModalOpen(false);
              resetForm();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedCity || !startDate || !endDate}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
