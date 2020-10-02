import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListRecipes from "./recipelist/ListRecipes";
import InputRecipe from "./recipelist/InputRecipe";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    margin: "20px",
    textAlign: "center",
  },
  add: {
    padding: "40px",
    marginTop: "100px",
    backgroundColor: "white",
    borderRadius: "25px",
    boxShadow: "0 1px 5px rgba(0, 0, 9, 0.15)",
  },
  edit: {
    padding: "40px",
    marginTop: "20px",
    backgroundColor: "white",
    borderRadius: "25px",
    boxShadow: "0 1px 5px rgba(0, 0, 9, 0.15)",
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
      setName(parseRes[0].name);
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
        <Typography variant="h5" component="h3" color="secondary">
          This is {name}'s recipe
        </Typography>

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
