import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card-cnt">
      <div className="card">
        <div className="input-cnt">
          <input type="text" placeholder="Enter username" id="username-input" />
          <button id="submit-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
