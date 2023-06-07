import React from "react";

import "./Container.css";

function Container(props) {
  return <article className="container">{props.children}</article>;
}

export default Container;
