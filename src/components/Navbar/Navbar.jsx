import { UserButton } from "@clerk/clerk-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <h1>
          Weather <span>Forecast</span>
        </h1>
        <UserButton
          appearance={{
            variables: {
              fontFamily: "Montserrat",
              colorBackground: "#ffffff",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
