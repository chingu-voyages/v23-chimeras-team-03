import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import EditRecipe from "./EditRecipe";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  text: {
    width: "100%",
  },
  delete: {
    marginBottom: "10px",
    color: "#FFFFFF",
    background: "#F44336",
  },
  food: {
    width: "200px",
  },
}));

const ListRecipes = ({ allRecipes, setRecipesChange }) => {
  const [recipes, setRecipes] = useState([]);
  const classes = useStyles();

  async function deleteRecipe(id) {
    try {
      await fetch(`/dashboard/recipes/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    setRecipes(allRecipes);
  }, [allRecipes]);

  return (
    <Fragment>
      <div className={classes.root}>
        {recipes.length !== 0 &&
          recipes[0].id !== null &&
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <img src={recipe.image} alt="Food" className={classes.food} />
              <TextField
                style={{ margin: 8 }}
                helperText="Recipe title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={recipe.title}
              />
              <TextField
                style={{ margin: 8 }}
                helperText="DietLables: Carbs|Keto|Protein..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={recipe.diets}
              />

              <TextareaAutosize
                aria-label="ingredients"
                className={classes.text}
                rowsMin={5}
                value={recipe.ingredients}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.delete}
                onClick={() => deleteRecipe(recipe.id)}
              >
                Delete Recipe
              </Button>
              <EditRecipe recipe={recipe} setRecipesChange={setRecipesChange} />
              <Divider />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default ListRecipes;
