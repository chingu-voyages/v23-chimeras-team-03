import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
}));

const EditRecipe = ({ recipe, setRecipesChange }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    base64: recipe.base64,
    label: recipe.label,
    dietlabels: recipe.dietlabels,
    source: recipe.source,
    url: recipe.url,
    text: recipe.text,
  });

  const { base64, label, dietlabels, source, url, text } = inputs;
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
      const body = { inputs };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:7000/dashboard/recipes/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setRecipesChange(true);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <Fragment>
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.paper}
      >
        <input type="file" name="base64" onChange={(e) => onChange(e)} />
        <img src={window.atob(recipe.base64)} alt="Food" />
        <TextField
          style={{ margin: 8 }}
          placeholder={recipe.label}
          helperText="Label"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="label"
          value={label}
          onChange={(e) => onChange(e)}
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
          name="dietlabels"
          value={dietlabels}
          onChange={(e) => onChange(e)}
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
          name="source"
          value={source}
          onChange={(e) => onChange(e)}
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
          name="url"
          value={url}
          onChange={(e) => onChange(e)}
        />
        <TextareaAutosize
          aria-label="ingredients"
          className={classes.text}
          placeholder={recipe.text}
          rowsMin={5}
          name="text"
          value={text}
          onChange={(e) => onChange(e)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => EditForm(recipe.recipe_id)}
        >
          Save Changes
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.delete}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Dialog>
    </Fragment>
  );
};

export default EditRecipe;
