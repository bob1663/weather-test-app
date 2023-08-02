import { UserButton } from "@clerk/clerk-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        Weather <span>Forecast</span>
      </h1>

      <UserButton />
    </div>
  );
};

export default Navbar;
