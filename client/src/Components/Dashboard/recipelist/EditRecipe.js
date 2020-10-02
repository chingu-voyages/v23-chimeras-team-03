import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
    maxWidth: "600px",
  },
  edit: {
    marginBottom: "40px",
  },
  food: {
    width: "200px",
  },
  text: {
    width: "100%",
  },
}));

const EditRecipe = ({ recipe, setRecipesChange }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    image: recipe.image,
    title: recipe.title,
    diets: recipe.diets,
    ingredients: recipe.ingredients,
  });

  const { image, title, diets, ingredients } = inputs;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  async function EditForm(id) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:7000/dashboard/recipes/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(inputs),
      });

      setRecipesChange(true);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <Fragment>
      <div>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleOpen}
          className={classes.edit}
        >
          Edit Recipe
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.paper}
        >
          <DialogTitle id="alert-dialog-title">Edit Recipe</DialogTitle>
          <DialogContent>
            <img src={recipe.image} alt="Food" className={classes.food} />
            <TextField
              style={{ margin: 8 }}
              helperText="Image URL"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="image"
              value={image}
              onChange={(e) => onChange(e)}
            />

            <TextField
              style={{ margin: 8 }}
              helperText="Name of Recipe"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
            <TextField
              style={{ margin: 8 }}
              helperText="DietLables: Carbs|Keto|Protein..."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="diets"
              value={diets}
              onChange={(e) => onChange(e)}
            />

            <TextareaAutosize
              aria-label="ingredients"
              className={classes.text}
              rowsMin={5}
              name="ingredients"
              value={ingredients}
              onChange={(e) => onChange(e)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => EditForm(recipe.id)}
            >
              Save Changes
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default EditRecipe;
