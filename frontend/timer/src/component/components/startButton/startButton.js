import React from "react";
import "./startButton.css";

export default function StartButton({ onClick }) {
  return (
    <div className="start_btn">
      <button onClick={onClick}>Start</button>
    </div>
  );
}
