import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => (
  <ReactLoading
    type={"spinningBubbles"}
    color={"#3832A0"}
    height={50}
    width={50}
    className="loader"
  />
);

export default Loader;
