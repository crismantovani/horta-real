import React from "react";

import "./Header.css";
import logo from "../../assets/img/logo.svg";

function Header() {
  return (
    <header>
      <div className="header">
        <div className="logo">
          <img className="logo__icon" src={logo} alt="Arvrinha" />
          <span className="logo__text">HortaReal</span>
        </div>
        <div className="user"></div>
      </div>
    </header>
  );
}

export default Header;
