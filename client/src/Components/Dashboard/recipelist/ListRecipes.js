import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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
  },
  edit: {
    marginBottom: "10px",
  },
}));

const ListRecipes = ({ allRecipes, setRecipesChange }) => {
  const [recipes, setRecipes] = useState([]);
  const classes = useStyles();

  async function deleteRecipe(id) {
    try {
      await fetch(`http://localhost:7000/dashboard/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
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
          recipes[0].recipe_id !== null &&
          recipes.map((recipe) => (
            <div key={recipe.recipe_id}>
              <img src={window.atob(recipe.base64)} alt="Food" />
              <TextField
                style={{ margin: 8 }}
                placeholder={recipe.label}
                helperText="Recipe title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ margin: 8 }}
                placeholder={recipe.dietlabels}
                helperText="DietLables: Carbs|Keto|Protein..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ margin: 8 }}
                placeholder={recipe.source}
                helperText="From source"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ margin: 8 }}
                placeholder={recipe.url}
                helperText="Original source url path"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextareaAutosize
                aria-label="ingredients"
                className={classes.text}
                placeholder={recipe.text}
                rowsMin={5}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.edit}
              >
                Edit Recipe
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.delete}
              >
                Delete Recipe
              </Button>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default ListRecipes;
