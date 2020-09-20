import React, { useState } from "react";
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
    <nav className="navbar">
      <h1>Logo</h1>
      <form onSubmit={formSubmit}>
        <input
          onChange={searchHandler}
          value={search}
          type="text"
          className="nav-Input"
        ></input>
        <button>Search</button>
      </form>
      <form>
        <button>Sign Up</button>
        <button>login</button>
      </form>
    </nav>
  );
}

export default Landingpage;
