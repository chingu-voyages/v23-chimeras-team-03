import React from "react";
import "./App.css";
import SignIn from "./components/signin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe App</h1>
        <SignIn></SignIn>
      </header>
    </div>
  );
}

export default App;
