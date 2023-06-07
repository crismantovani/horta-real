import React from "react";

import "./Container.css";

const Container = (props) => {
  return (
    <article
      className={`${props.containerFluid ? "container-fluid" : "container"}`}
    >
      {props.children}
    </article>
  );
};

export default Container;
