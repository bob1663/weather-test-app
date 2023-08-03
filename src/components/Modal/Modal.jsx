import { useEffect } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ setModalOpen, modalOpen }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = modalOpen === true ? "hidden" : "auto";
  }, [modalOpen]);
  return (
    <div className={`modal ${modalOpen ? "active" : ""}`}>
      <form className="modal__form">
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
          <select>
            <option value="" disabled selected>
              Please select a city
            </option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
          <p>
            <span>*</span>Start date
          </p>
          <input type="date" />
          <p>
            <span>*</span>End date
          </p>
          <input type="date" />
        </div>
        <div className="form-border" />
        <div className="modal__form-footer">
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
