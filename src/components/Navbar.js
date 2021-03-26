import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return window.removeEventListener("resize", showButton);
  }, []);

  const LoggedInNav = (
    <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li className="nav-item">
        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/categories" className="nav-links" onClick={closeMobileMenu}>
          Categories
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to=""
          className="nav-links"
          onClick={() => {
            closeMobileMenu();
            localStorage.removeItem("token");
            localStorage.removeItem("categories");
            props.setLogoutState();
            window.location.href = "/";
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );

  const notLoggedInNav = (
    <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li className="nav-item">
        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
          Login
        </Link>
      </li>
      <li className="nav-btn">
        {button ? (
          <Button href="/signup" color="secondary" variant="contained">
            SIGN UP
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={closeMobileMenu}
            href="/signup"
          >
            SIGN UP
          </Button>
        )}
      </li>
    </ul>
  );

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiTakeMyMoney className="navbar-icon" />
              BUDGET
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            {props.logged_in ? LoggedInNav : notLoggedInNav}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
