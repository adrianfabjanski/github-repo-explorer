import React from "react";
import "./Input.css";

const Input = ({ handleSearch, searching, setSearchQuery }) => {
  return (
    <div className="input-cnt">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter username"
          id="username-input"
          onChange={(e) =>
            setSearchQuery(e.target.value.toLowerCase().split(" ").join(""))
          }
          autoComplete="off"
          required
        />
        <button id="submit-btn" type="submit">
          {searching ? <div className="lds-dual-ring"></div> : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Input;
