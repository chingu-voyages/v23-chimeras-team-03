import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListRecipes from "./recipelist/ListRecipes";
import InputRecipe from "./recipelist/InputRecipe";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: "0",
    left: "0",
    marginBottom: "20px",
  },
  add: {
    border: "1px solid red",
    marginTop: "100px",
  },
  edit: {
    padding: "40px",
    border: "1px solid blue",
    marginTop: "20px",
  },
}));

const Dashboard = ({ setAuth }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipesChange, setRecipesChange] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  async function getName() {
    try {
      const response = await fetch("http://localhost:7000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      setAllRecipes(parseRes);
      setName(parseRes[0].user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
    setRecipesChange(false);
  }, [recipesChange]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>This is {name}'s recipe</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => logout(e)}
        >
          Log out
        </Button>
      </div>
      <div className={classes.add}>
        <InputRecipe setRecipesChange={setRecipesChange} />
      </div>
      <div className={classes.edit}>
        <ListRecipes
          allRecipes={allRecipes}
          setRecipesChange={setRecipesChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
