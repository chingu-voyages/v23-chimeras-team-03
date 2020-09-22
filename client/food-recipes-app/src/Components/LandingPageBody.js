import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

import "../LandingPage.css";

function LandingPageBody({ recipe }) {
  const [show, setShow] = useState(false);
  const { label, image, ingredients } = recipe.recipe;
  return (
    <div className="container">
      <div className="recipes">
        <h2>{label}</h2>
        <img src={image} alt={label} />
      </div>
      <div className="recipe-Ingredents">
        <button onClick={() => setShow(!show)}>Ingredients</button>
        {show && <RecipeDetails ingredients={ingredients} />}
      </div>
    </div>
  );
}

export default LandingPageBody;
