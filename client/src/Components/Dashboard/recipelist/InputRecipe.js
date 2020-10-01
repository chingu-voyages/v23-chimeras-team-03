import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  text: {
    width: "100%",
  },
}));

const InputRecipe = ({ setRecipesChange }) => {
  const classes = useStyles();
  const initialState = {
    image: "",
    title: "",
    diets: "",
    ingredients: "",
  };
  const [inputs, setInputs] = useState(initialState);

  const { image, title, diets, ingredients } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async () => {
    // e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch("http://localhost:7000/dashboard/recipes", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(inputs),
      });

      setRecipesChange(true);
      setInputs(initialState);
    } catch (error) {
      console.error(error.message);
    }
  };

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: initialState,
  });

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          style={{ margin: 8 }}
          helperText="ImageUrl"
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
          helperText="Recipe title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="title"
          value={title}
          onChange={(e) => onChange(e)}
          inputRef={register({ required: true })}
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
          inputRef={register({ required: true })}
        />
        <TextareaAutosize
          aria-label="ingredients"
          rowsMin={5}
          value={ingredients}
          name="ingredients"
          className={classes.text}
          onChange={(e) => onChange(e)}
          placeholder="Ingredients"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!formState.isValid}
        >
          Add Recipe
        </Button>
      </form>
    </Fragment>
  );
};

export default InputRecipe;
