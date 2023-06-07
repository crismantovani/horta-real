import React from "react";

import "./Card.css";
import umidity from "../../assets/icons/umidity.svg";

function Card({ name }) {
  return (
    <div className="card">
      <p className="card__title">{name}</p>
      <div className="card__temperature">
        <div>00º</div>
        <div>Temperatura</div>
      </div>
      <div className="card__humidity">
        <img src={umidity} alt="" />
        <div>20%</div>
      </div>
    </div>
  );
}

export default Card;
