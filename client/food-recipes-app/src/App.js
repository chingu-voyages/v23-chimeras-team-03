import React, { Fragment } from "react";
import "./App.css";
import LandingPage from "./Components/Landingpage";
import Dashboard from "./Components/Dashboard";
import SignIn from "./Components/signin";
import SignUp from "./Components/signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
