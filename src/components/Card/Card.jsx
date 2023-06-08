import React, { useEffect, useState } from "react";

import "./Card.css";
import Sensors from "../../model/Sensors";
import umidity from "../../assets/icons/umidity.svg";

function getSensors(sensors) {
  return Sensors.filter((sensor) => {
    sensors.includes(sensor.id);
  });
}

function Card({ name }) {
  const temperature = Sensors[3].value;
  const umidityValue = Sensors[2].value;

  return (
    <div className="card">
      <p className="card__title">{name}</p>
      {/* <div className="card__sensors">
        {sensorsData.map((sensor) => {
          <span key={`sensors-${sensor.id}`}>
            <img
              src={sensor.icone}
              alt={`Ícone que representa o sensor de ${sensor.name}`}
            />
          </span>;
        })}
      </div> */}
      <div className="card__temperature">
        <div>{temperature}</div>
        <div>Temperatura</div>
      </div>
      <div className="card__humidity">
        <img src={umidity} alt="" />
        <div>{umidityValue}</div>
      </div>
    </div>
  );
}

export default Card;
