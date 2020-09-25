import React, { Fragment } from "react";

import NavBar from "./Navbar";
import Footer from "./Footer";
import ProductHero from "./ProductHero";

const LandingPage = () => {
  return (
    <Fragment>
      <NavBar />
      <ProductHero />
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
