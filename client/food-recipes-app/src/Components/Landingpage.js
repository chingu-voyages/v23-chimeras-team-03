import React, { useState } from "react";
import LandingPagebody from "./LandingPageBody";
import "../App.css";
function Landingpage() {
  const [search, setSearch] = useState("");

  function searchHandler(e) {
    setSearch(e.target.value);
  }

  function formSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <nav className="navbar">
        <h1 className="nav-logo">Logo</h1>
        <form
          onSubmit={formSubmit}
          className="nav-form"
          style={{ marginLeft: "100px" }}
        >
          <input
            onChange={searchHandler}
            value={search}
            type="text"
            className="nav-Input"
          ></input>
          <button className="nav-btn" style={{ marginLeft: "70px" }}>
            Search
          </button>
        </form>
        <form>
          <button className="nav-btn">Sign Up</button>
          <button className="nav-btn">login</button>
        </form>
      </nav>
      <LandingPagebody />
    </div>
  );
}

export default Landingpage;
