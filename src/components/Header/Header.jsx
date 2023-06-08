import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/img/logo.svg";

function Header() {
  const [titlePage, setTitlePage] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/")
      setTitlePage("Residencial Vivendas da Barra");
    if (location.pathname === "/cadastro") setTitlePage("Cadastrar item");
    if (location.pathname.includes("/informacoes")) setTitlePage("Informações");
    if (location.pathname.includes("/usuarios")) setTitlePage("Usuários");
  }, [location]);

  return (
    <header>
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img className="logo__icon" src={logo} alt="Logo do HortaReal" />
            <span className="logo__text">HortaReal</span>
          </div>
        </Link>
        <div className="user"></div>
      </div>
      <div className="pageTitle">{titlePage}</div>
    </header>
  );
}

export default Header;
