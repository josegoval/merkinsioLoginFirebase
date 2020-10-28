// React
import React from "react";

export default function Separator({ middleText }) {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="col">
        <hr />
      </div>
      <div className="col-auto">{middleText}</div>
      <div className="col">
        <hr />
      </div>
    </div>
  );
}
