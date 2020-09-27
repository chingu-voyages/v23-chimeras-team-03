import React from "react";
import { v4 as uuidv4 } from "uuid";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: "0.65rem",
  },
  text: {
    fontSize: "0.65rem",
  },
}));

const RecipeDetails = ({ ingredients }) => {
  const classes = useStyles();

  return ingredients.map((ingredient) => {
    return (
      <div className={classes.root} key={uuidv4()}>
        <List component="nav" aria-label="Ingredient" key={uuidv4()}>
          <ListItem button>
            <ListItemIcon>
              <DoneSharpIcon />
            </ListItemIcon>
            <ListItemText primary={ingredient.text} className={classes.text} />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  });
};

export default RecipeDetails;
