import React, { useState } from "react";
import LandingPagebody from "./LandingPageBody";
import "../App.css";
import ErrorSnackBar from "./ErrorSnackBar";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    margin: "5px",
    [theme.breakpoints.down("xs")]: {
      width: "60px",
      height: "60px",
    },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandname: {
    color: "#171311",
    fontSize: "40px",
    fontWeight: "bold",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    color: "#1A1C20",
    fontWeight: "bold",
    fontSize: "30px",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    flexGrow: "0.75",
    marginRight: "15px",
  },
  login: {
    backgroundColor: "#F4F4F4",
    color: "#CF7500",
    marginRight: "5px",
  },
}));

function Landingpage() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "109df0b1";
  const APP_KEY = "8910f0fb1c1d41a518962eb7e3ae7375";

  async function getRecipes() {
    if (search !== "") {
      const response = await Axios.get(baseUrl);
      console.log(baseUrl);
      console.log(response);

      if (!response.data.more) {
        return setAlert("No food with provided name!");
      }

      setRecipes(response.data.hits);
      setSearch("");
      setAlert("");
    } else {
      setAlert("Search for recipes here!");
    }
  }

  function searchHandler(e) {
    setSearch(e.target.value);
  }

  function formSubmit(e) {
    e.preventDefault();
    getRecipes();
  }

  const baseUrl = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#F0A500" }}>
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon aria-controls="simple menu" aria-haspopup="true" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Log In</MenuItem>
              <MenuItem onClick={handleClose}>Register</MenuItem>
            </Menu>
          </div>

          <div className={classes.brand}>
            <img
              src="/favicon.ico"
              alt="logo"
              width="80"
              height="80"
              className={classes.logo}
            />
          </div>
          <Typography variant="h6" className={classes.title}>
            Foody
          </Typography>

          <div className={classes.search}>
            <form onSubmit={formSubmit}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={searchHandler}
                value={search}
                type="text"
              />
            </form>
          </div>
          <div className={classes.grow} />
          <div className={classes.right}>
            <Button variant="contained" className={classes.login}>
              Log In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.register}
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {alert !== "" && <ErrorSnackBar alert={alert} />}
      {recipes !== [] &&
        recipes.map((recipe) => (
          <LandingPagebody key={uuidv4()} recipe={recipe} />
        ))}
    </div>
  );
}

export default Landingpage;
