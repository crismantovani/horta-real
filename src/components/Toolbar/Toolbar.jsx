import React from "react";
import { Link } from "react-router-dom";

import "./Toolbar.css";

import users from "../../assets/icons/users.svg";
import home from "../../assets/icons/home.svg";
import registry from "../../assets/icons/registry.svg";

function Toolbar() {
  return (
    <div className="toolbar">
      <Link to={"usuarios"} className="button__action">
        <img src={users} alt="" />
        <span>Usuários</span>
      </Link>
      <Link to={"/"} className="button__home">
        <img src={home} alt="" />
      </Link>
      <Link to={"cadastro"} className="button__action">
        <img src={registry} alt="" />
        <span>Cadastrar</span>
      </Link>
    </div>
  );
}

export default Toolbar;
