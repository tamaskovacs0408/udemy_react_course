import React from "react";

const DemoOutput = ({ show }) => {
  console.log("DemoOutput running");
  return <div className="hidden-text">{show ? "Text" : ""}</div>;
};

export default React.memo(DemoOutput);
